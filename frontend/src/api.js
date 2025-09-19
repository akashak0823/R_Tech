// src/api.js
import axios from "axios";

// Prefer environment override, otherwise use relative "/api" so it works with
// CRA dev proxy and same-origin production deployments.
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://www.rtecsolutionspvtltd.com/api",
});

////////////////////////
// 🛠️ Products API
////////////////////////
export const fetchProducts = () => API.get("/products");
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

////////////////////////
// ⚙️ Services API
////////////////////////
export const fetchServices = () => API.get("/services");
export const fetchServiceById = (id) => API.get(`/services/${id}`);
export const fetchServiceBySlug = (slug) => API.get(`/services/slug/${slug}`);
export const createService = (data) => API.post("/services", data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);

////////////////////////
// 📄 About API
////////////////////////
export const fetchAbout = () => API.get(`/about`);
export const createAbout = (data) => API.post(`/about`, data);
export const updateAbout = (id, data) => API.put(`/about/${id}`, data);
export const deleteAbout = (id) => API.delete(`/about/${id}`);

////////////////////////
// 🤖 Chatbot API
////////////////////////
export const askChatbot = (query) => API.post(`/chatbot`, { query });

export default API;
