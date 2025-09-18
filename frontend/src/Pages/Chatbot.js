import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { askChatbot } from "../api";
import "../Styles/Chatbot.css";
import logo from "../assets/Logo.png";

const makeAbsoluteUrl = (url) => {
  if (!url) return "";
  // If it's already an absolute URL (starts with http), return as is
  if (url.startsWith("http")) return url;
  // For relative URLs, just return them as-is so they work with React Router
  return url;
};

const Greeting = () => (
  <div className="greeting">
    <img src={logo} alt="Rtec Logo" className="chat-logo" />
    <div>
      <strong>Rtec Assistant</strong>
      <div>Hi! Ask me about any product or service. I’ll reply with details and links.</div>
    </div>
  </div>
);

const TypingIndicator = () => (
  <div className="typing">
    <span className="dot" />
    <span className="dot" />
    <span className="dot" />
  </div>
);

const SuggestionChips = ({ suggestions = [], onSelect }) => {
  if (!Array.isArray(suggestions) || suggestions.length === 0) return null;
  return (
    <div className="suggestions">
      {suggestions.map((s, i) => (
        <button key={i} className="suggestion-chip" onClick={() => onSelect(s)}>
          {s}
        </button>
      ))}
    </div>
  );
};

const ResultCard = ({ title, subtitle, description, image, link, cta = "View" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(makeAbsoluteUrl(link));
    }
  };

  return (
    <div className="result-card">
      {image && (
        <div className="card-image">
          <img src={makeAbsoluteUrl(image)} alt={title} />
        </div>
      )}
      <div className="card-content">
        <div className="card-title">{title}</div>
        {subtitle && <div className="card-subtitle">{subtitle}</div>}
        {description && <div className="card-desc">{description}</div>}
        {link && (
          <button className="card-cta" onClick={handleClick}>
            {cta} →
          </button>
        )}
      </div>
    </div>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatWindowRef = useRef(null);
  const navigate = useNavigate();

  // Helper function to parse plain text AI responses
  const parsePlainTextResponse = (text) => {
    if (!text) return text;
    
    // Split text into lines
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Handle bold text (e.g., **Product Name:**)
      if (line.includes('**') && line.includes(':')) {
        const parts = line.split('**');
        if (parts.length >= 3) {
          const label = parts[1];
          const value = parts.slice(2).join('**').replace(':', '').trim();
          return (
            <div key={index} className="info-row">
              <span className="info-label">{label}:</span>
              <span className="info-value">{value}</span>
            </div>
          );
        }
      }
      
      // Handle image URLs (convert to proper image display)
      if (line.includes('![') && line.includes('](') && line.includes(')')) {
        const match = line.match(/!\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          const altText = match[1];
          const imageUrl = match[2];
          return (
            <div key={index} className="product-image">
              <img src={imageUrl} alt={altText} style={{ maxWidth: '100%', borderRadius: '8px', margin: '8px 0' }} />
            </div>
          );
        }
      }
      
      // Handle product links (e.g., "Link: [View Product]")
      if (line.includes('Link:') && line.includes('[') && line.includes(']')) {
        const match = line.match(/Link:\s*\[([^\]]+)\]/);
        if (match) {
          const linkText = match[1];
          // Try to find the corresponding product link from the data
          // For now, we'll create a generic product button
          return (
            <div key={index} className="product-link-row">
              <button 
                className="product-link-btn"
                onClick={() => navigate('/products')}
              >
                {linkText} →
              </button>
            </div>
          );
        }
      }
      
      // Handle raw URLs (convert them to proper links or remove them)
      if (line.includes('http') && line.includes('res.cloudinary.com')) {
        // This is a Cloudinary image URL, skip it as it's already handled above
        return null;
      }
      
      // Handle very long URLs or text that might cause overflow
      if (line.includes('http') && line.length > 80) {
        const truncatedUrl = line.substring(0, 80) + '...';
        return (
          <div key={index} className="text-line">
            <span title={line}>{truncatedUrl}</span>
          </div>
        );
      }
      
      // Handle regular text
      if (line.trim()) {
        // Truncate very long lines to prevent overflow
        if (line.length > 120) {
          const truncatedText = line.substring(0, 120) + '...';
          return (
            <div key={index} className="text-line">
              <span title={line}>{truncatedText}</span>
            </div>
          );
        }
        return <div key={index} className="text-line">{line}</div>;
      }
      
      return null;
    });
  };

  const defaultSuggestions = [
    "Show me filter cartridges",
    "Products in Industrial Hardware",
    "Services for smart sensors",
    "Contact information",
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { sender: "bot", text: <Greeting /> },
        { sender: "bot", text: <SuggestionChips suggestions={defaultSuggestions} onSelect={(s) => handleSuggestion(s)} /> },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSuggestion = async (text) => {
    setInput(text);
    await sendMessage(text);
  };

  const sendMessage = async (outboundText) => {
    const trimmed = (outboundText ?? input).trim();
    if (!trimmed) return;

    const newMessages = [...messages, { sender: "user", text: trimmed }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await askChatbot(trimmed);
      
      // Debug logging
      console.log("Chatbot response:", res.data);
      console.log("Response type:", res.data.type);
      console.log("Response data:", res.data.data);

      const reply = formatResponse(res.data);
      console.log("Formatted reply:", reply);
      
      setMessages([...newMessages, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      console.error("Error response:", err.response?.data);
      setMessages([
        ...newMessages,
        { 
          sender: "bot", 
          text: (
            <div>
              <span>Sorry, I couldn't process your request.</span>
              {process.env.NODE_ENV === 'development' && (
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  Error: {err.response?.data?.message || err.message}
                </div>
              )}
            </div>
          ) 
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatResponse = (data) => {
    console.log("formatResponse called with:", data);
    
    // Handle AI responses that contain structured data
    if (data.type === "ai" && data.data && Array.isArray(data.data)) {
      console.log("Processing AI response with data array:", data.data);
      
      // Check if we have product data to create proper cards
      const productData = data.data.find(item => item.type === "product" || item.type === "products");
      
      if (productData && productData.data) {
        // Create proper product cards
        if (Array.isArray(productData.data)) {
          return (
            <div>
              <div className="plain-text" style={{ marginBottom: '16px' }}>
                {data.answer.split('\n').slice(0, 2).join('\n')} {/* Show first 2 lines of AI response */}
              </div>
              <div className="cards-grid">
                {productData.data.map((product, i) => (
                  <ResultCard
                    key={i}
                    title={product.name}
                    subtitle={product.category}
                    description={product.description}
                    image={product.image}
                    link={product.link}
                    cta="View Product"
                  />
                ))}
              </div>
            </div>
          );
        } else {
          // Single product
          return (
            <div>
              <div className="plain-text" style={{ marginBottom: '16px' }}>
                {data.answer.split('\n').slice(0, 2).join('\n')}
              </div>
              <ResultCard
                title={productData.data.name}
                subtitle={productData.data.category}
                description={productData.data.description}
                image={productData.data.image}
                link={productData.data.link}
                cta="View Product"
              />
            </div>
          );
        }
      }
      
      // Fallback to parsed text if no structured product data
      return (
        <div className="product-info">
          {parsePlainTextResponse(data.answer)}
        </div>
      );
    }

    console.log("Processing direct type response:", data.type);
    // Handle direct type responses (existing logic)
    switch (data.type) {
      case "service":
        return (
          <div>
            <ResultCard
              title={data.answer.title}
              description={data.answer.description}
              link={data.answer.link}
              cta="View service"
            />
            {Array.isArray(data.answer.keyFeatures) && data.answer.keyFeatures.length > 0 && (
              <ul className="bullet-list">
                {data.answer.keyFeatures.slice(0, 5).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
            {Array.isArray(data.answer.related) && data.answer.related.length > 0 && (
              <div className="related">
                <div className="related-title">Related services</div>
                <ul>
                  {data.answer.related.map((r, i) => (
                    <li key={i}>
                      <button 
                        className="chat-link" 
                        onClick={() => navigate(makeAbsoluteUrl(r.link))}
                      >
                        {r.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case "product":
        return (
          <div>
            <ResultCard
              title={data.answer.name}
              subtitle={data.answer.category}
              description={data.answer.description || data.answer.details}
              image={data.answer.image}
              link={data.answer.link}
              cta="View product"
            />
            {Array.isArray(data.answer.related) && data.answer.related.length > 0 && (
              <div className="related">
                <div className="related-title">Related products</div>
                <div className="cards-grid">
                  {data.answer.related.map((r, i) => (
                    <ResultCard key={i} title={r.name} image={r.image} link={r.link} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "contact":
        return (
          <div>
            📧 {data.answer.email}
            <br />
            📞 {data.answer.phone}
            <br />
            📍 {data.answer.location}
          </div>
        );

      case "about":
        return <span>{data.answer}</span>;

      case "services":
        if (Array.isArray(data.answer)) {
          return (
            <div className="cards-grid">
              {data.answer.map((item, i) => (
                <ResultCard
                  key={i}
                  title={item.title || item.name}
                  description={item.description}
                  link={item.link}
                  cta="View"
                />
              ))}
            </div>
          );
        }
        break;

      case "products":
        if (Array.isArray(data.answer)) {
          return (
            <div className="cards-grid">
              {data.answer.map((item, i) => (
                <ResultCard
                  key={i}
                  title={item.name}
                  subtitle={item.category}
                  description={item.description}
                  image={item.image}
                  link={item.link}
                  cta="View product"
                />
              ))}
            </div>
          );
        }
        break;

      default:
        console.log("Default case - data.answer:", data.answer);
        if (typeof data.answer === "object") {
          try {
            return <pre>{JSON.stringify(data.answer, null, 2)}</pre>;
          } catch {
            return <span>{String(data.answer)}</span>;
          }
        }
        return (
          <div className="product-info">
            {parsePlainTextResponse(data.answer)}
            {Array.isArray(data.suggestions) && data.suggestions.length > 0 && (
              <SuggestionChips suggestions={data.suggestions} onSelect={(s) => handleSuggestion(s)} />
            )}
          </div>
        );
    }
  };

  return (
    <>
      {!isOpen && (
        <button className="chat-toggle-button" onClick={() => setIsOpen(true)} aria-label="Open chat">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"/>
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="chat-header">
            <div className="brand">
              <img src={logo} alt="Rtec Logo" />
              <span>Rtec Assistant</span>
            </div>
            <div className="actions">
              <button className="icon-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          <div className="chat-window" ref={chatWindowRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="message bot"><TypingIndicator /></div>
            )}
          </div>

          <div className="chat-input modern">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about our products or services..."
            />
            <button onClick={() => sendMessage()} className="send-btn icon" aria-label="Send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.4 1.6l19 9.1c.9.4.9 1.8 0 2.2l-19 9.1c-.9.4-1.9-.4-1.7-1.3L3.6 13l9-1-9-1L1.7 2.9C1.5 2 2.5 1.2 3.4 1.6z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
