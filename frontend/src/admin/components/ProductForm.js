import React, { useState, useEffect } from "react";
import "../../Styles/admin/ModalForm.css";

const ProductForm = ({ initialData, onClose, onSubmit }) => {
  const defaultForm = {
    _id: "",
    name: "",          // product name
    category: "",
    slug: "",
    description: "",
    keyFeatures: "",    // comma-separated string
    details: "",
    related: "",        // comma-separated string
  };

  const [form, setForm] = useState(defaultForm);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  // Load initial data into form and media preview if editing
  useEffect(() => {
    if (initialData) {
      setForm({
        _id: initialData._id || "",
        name: initialData.name || "",
        category: initialData.category || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        keyFeatures: Array.isArray(initialData.keyFeatures)
          ? initialData.keyFeatures.join(", ")
          : initialData.keyFeatures || "",
        details: initialData.details || "",
        related: Array.isArray(initialData.related)
          ? initialData.related.join(", ")
          : initialData.related || "",
      });

      // Set media preview to first image URL or fallback
      if (initialData.images?.[0]?.url) {
        setMediaPreview(initialData.images[0].url);
      } else if (initialData.img) {
        setMediaPreview(initialData.img);
      } else {
        setMediaPreview(null);
      }

      setMediaFile(null);
    } else {
      // Reset form if no initial data
      setForm(defaultForm);
      setMediaFile(null);
      setMediaPreview(null);
    }
  }, [initialData]);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (mediaPreview && mediaPreview.startsWith("blob:")) {
        URL.revokeObjectURL(mediaPreview);
      }
    };
  }, [mediaPreview]);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle product image file input change
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMediaFile(file);
    if (file) setMediaPreview(URL.createObjectURL(file));
    else setMediaPreview(null);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Auto-generate slug if empty
    const slug =
      form.slug && form.slug.trim() !== ""
        ? form.slug.trim()
        : form.name.trim().toLowerCase().replace(/\s+/g, "-");

    // Convert comma-separated strings to arrays
    const keyFeaturesArray = (form.keyFeatures || "")
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const relatedArray = (form.related || "")
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    const payload = {
      _id: form._id,
      name: form.name,
      category: form.category,
      slug,
      description: form.description,
      keyFeatures: keyFeaturesArray,
      details: form.details,
      related: relatedArray,
      images: mediaFile ? [mediaFile] : [], // File(s) to upload
    };

    onSubmit(payload);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3>{initialData ? "Edit Product" : "Add Product"}</h3>

        <form
          onSubmit={handleSubmit}
          className="modal-form"
          encType="multipart/form-data"
        >
          <label>Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Product Name"
          />

          <label>Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="Product Category"
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
            placeholder="Short Description"
          />

          <label>Details</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            placeholder="Detailed Explanation"
          />

          <label>Related Products (comma-separated)</label>
          <textarea
            name="related"
            value={form.related}
            onChange={handleChange}
            placeholder="related-product-1, related-product-2"
          />

          <label>Upload Product Image</label>
          <input type="file" accept="image/*" onChange={handleMediaChange} />
          {mediaPreview && (
            <div style={{ marginTop: 10 }}>
              <img
                src={mediaPreview}
                alt="Media Preview"
                style={{ maxWidth: 200, maxHeight: 150 }}
              />
            </div>
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
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
