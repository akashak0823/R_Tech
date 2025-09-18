import React, { useState, useEffect } from "react";
import "../../Styles/admin/ModalForm.css";

const ServiceForm = ({ initialData, onClose, onSubmit }) => {
  const defaultForm = {
    title: "",
    category: "",
    slug: "",
    description: "",
    keyFeatures: "",
  };

  const [form, setForm] = useState(defaultForm);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);

  // On initialData change, update form and previews
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        category: initialData.category || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        // Show keyFeatures as comma separated string for textarea
        keyFeatures: Array.isArray(initialData.keyFeatures)
          ? initialData.keyFeatures.join(", ")
          : initialData.keyFeatures || "",
      });

      setMediaPreview(initialData.media?.url || null);
      setIconPreview(initialData.icon || null);

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

  // Cleanup created object URLs on unmount or change
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
    if (file) setMediaPreview(URL.createObjectURL(file));
    else setMediaPreview(null);
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setIconFile(file);
    if (file) setIconPreview(URL.createObjectURL(file));
    else setIconPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate slug if empty
    const slug =
      form.slug && form.slug.trim() !== ""
        ? form.slug.trim()
        : form.title.trim().toLowerCase().replace(/\s+/g, "-");

    // Prepare keyFeatures as array (split on comma, trim, filter empty)
    let keyFeaturesArray = [];
    if (typeof form.keyFeatures === "string") {
      keyFeaturesArray = form.keyFeatures
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
    } else if (Array.isArray(form.keyFeatures)) {
      keyFeaturesArray = form.keyFeatures;
    }

    // Prepare payload object
    const payload = {
      ...form,
      slug,
      keyFeatures: keyFeaturesArray,
      media: mediaFile,
      icon: iconFile,
    };

    onSubmit(payload);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3>{initialData ? "Edit Service" : "Add Service"}</h3>

        <form onSubmit={handleSubmit} className="modal-form" encType="multipart/form-data">
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Service Title"
          />

          <label>Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="Service Category"
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

          <label>Upload Media (Image/Video)</label>
          <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
          {mediaPreview && (
            <div style={{ marginTop: 10 }}>
              {mediaFile?.type?.startsWith("video/") || mediaPreview?.endsWith(".mp4") ? (
                <video width="200" controls src={mediaPreview} />
              ) : (
                <img
                  src={mediaPreview}
                  alt="Media Preview"
                  style={{ maxWidth: 200, maxHeight: 150 }}
                />
              )}
            </div>
          )}

          <label>Upload Icon Image</label>
          <input type="file" accept="image/*" onChange={handleIconChange} />
          {iconPreview && (
            <div style={{ marginTop: 10 }}>
              <img
                src={iconPreview}
                alt="Icon Preview"
                style={{ maxWidth: 100, maxHeight: 100, borderRadius: 4 }}
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
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
