import React, { useState, useEffect } from "react";
import "../../Styles/admin/ModalForm.css";

const ModalForm = ({ initialData, onClose, onSubmit, type = "service" }) => {
  const defaultForm = {
    title: "",
    category: "",
    slug: "",
    description: "",
    keyFeatures: "",
    details: "", // ✅ added
    related: "", // added related for products (comma-separated string)
  };

  const [form, setForm] = useState(defaultForm);
  const [mediaFile, setMediaFile] = useState(null); // main file (image/video)
  const [mediaPreview, setMediaPreview] = useState(null);
  const [iconFile, setIconFile] = useState(null); // icon (for service)
  const [iconPreview, setIconPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || initialData.name || "",
        category: initialData.category || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        keyFeatures: Array.isArray(initialData.keyFeatures)
          ? initialData.keyFeatures.join(", ")
          : initialData.keyFeatures || "",
        details: initialData.details || "", // product only
        related: Array.isArray(initialData.related)
          ? initialData.related.join(", ")
          : initialData.related || "",
      });

      if (initialData.media?.url) {
        setMediaPreview(initialData.media.url);
      } else if (initialData.images?.[0]?.url) {
        setMediaPreview(initialData.images[0].url);
      } else if (initialData.img) {
        // fallback for product img string
        setMediaPreview(initialData.img);
      } else {
        setMediaPreview(null);
      }

      if (initialData.icon) {
        setIconPreview(initialData.icon);
      } else {
        setIconPreview(null);
      }

      setMediaFile(null);
      setIconFile(null);
    } else {
      setForm(defaultForm);
      setMediaFile(null);
      setMediaPreview(null);
      setIconFile(null);
      setIconPreview(null);
    }
  }, [initialData]);

  useEffect(() => {
    return () => {
      if (mediaPreview && mediaPreview.startsWith("blob:")) {
        URL.revokeObjectURL(mediaPreview);
      }
      if (iconPreview && iconPreview.startsWith("blob:")) {
        URL.revokeObjectURL(iconPreview);
      }
    };
  }, [mediaPreview, iconPreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMediaFile(file);
    if (file) {
      setMediaPreview(URL.createObjectURL(file));
    } else {
      setMediaPreview(null);
    }
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setIconFile(file);
    if (file) {
      setIconPreview(URL.createObjectURL(file));
    } else {
      setIconPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const slug =
      form.slug && form.slug.trim() !== ""
        ? form.slug.trim()
        : form.title.trim().toLowerCase().replace(/\s+/g, "-");

    const payload = {
      ...form,
      name: form.title, // map title → name
      slug,
      keyFeatures: form.keyFeatures
        ? form.keyFeatures.split(",").map((f) => f.trim()).filter(Boolean)
        : [],
      related:
        type === "product" && form.related
          ? form.related.split(",").map((r) => r.trim()).filter(Boolean)
          : [],
    };

    if (type === "service") {
      payload.image = mediaFile;
      payload.icon = iconFile;
    } else if (type === "product") {
      payload.images = mediaFile ? [mediaFile] : [];
    }

    onSubmit(payload);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3>{initialData ? "Edit" : `Add ${type === "product" ? "Product" : "Service"}`}</h3>

        <form onSubmit={handleSubmit} className="modal-form" encType="multipart/form-data">
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder={`${type === "product" ? "Product" : "Service"} Title`}
          />

          <label>Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder={`${type === "product" ? "Product" : "Service"} Category`}
          />

          <label>Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="URL Slug (auto-generated if empty)"
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />

          {/* Product-only fields */}
          {type === "product" && (
            <>
              <label>Details</label>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Detailed explanation of the product"
              />

              <label>Related Products (comma-separated)</label>
              <textarea
                name="related"
                value={form.related}
                onChange={handleChange}
                placeholder="related-product-1, related-product-2"
              />
            </>
          )}

          <label>{type === "product" ? "Upload Product Image" : "Upload Media (Image/Video)"}</label>
          <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
          {mediaPreview && (
            <div className="media-preview-container" style={{ marginTop: 10 }}>
              {mediaFile?.type?.startsWith("video/") || mediaPreview?.endsWith(".mp4") ? (
                <video width="200" controls src={mediaPreview} />
              ) : (
                <img src={mediaPreview} alt="Media Preview" style={{ maxWidth: 200, maxHeight: 150 }} />
              )}
            </div>
          )}

          {/* Service-only: Icon upload */}
          {type === "service" && (
            <>
              <label>Upload Icon Image</label>
              <input type="file" accept="image/*" onChange={handleIconChange} />
              {iconPreview && (
                <div className="icon-preview-container" style={{ marginTop: 10 }}>
                  <img
                    src={iconPreview}
                    alt="Icon Preview"
                    style={{ maxWidth: 100, maxHeight: 100, borderRadius: 4 }}
                  />
                </div>
              )}
            </>
          )}

          <label>Key Features (comma-separated)</label>
          <textarea
            name="keyFeatures"
            value={form.keyFeatures}
            onChange={handleChange}
            placeholder="Feature 1, Feature 2, Feature 3"
          />

          <div className="modal-actions" style={{ marginTop: 20 }}>
            <button type="submit">{initialData ? "Update" : "Add"}</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
