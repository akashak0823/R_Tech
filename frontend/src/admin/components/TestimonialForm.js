import React, { useState, useEffect } from "react";
import "../../Styles/admin/ModalForm.css";

const TestimonialForm = ({ initialData, onClose, onSubmit }) => {
  const defaultForm = {
    _id: "",
    name: "",
    position: "",
    message: "",
    video: null, // file
  };

  const [form, setForm] = useState(defaultForm);
  const [videoPreview, setVideoPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        _id: initialData._id || "",
        name: initialData.name || "",
        position: initialData.position || "",
        message: initialData.message || "",
        video: null,
      });
      if (initialData.video) {
        setVideoPreview(
          initialData.video.startsWith("http")
            ? initialData.video
            : initialData.video.replace("../", "/")
        );
      }
    } else {
      setForm(defaultForm);
      setVideoPreview(null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, video: file }));
    if (file) setVideoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3>{initialData ? "Edit Testimonial" : "Add Testimonial"}</h3>
        <form onSubmit={handleSubmit} className="modal-form" encType="multipart/form-data">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Position</label>
          <input name="position" value={form.position} onChange={handleChange} required />

          <label>Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} required />

          <label>Upload Video</label>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
          {videoPreview && (
            <video src={videoPreview} controls style={{ width: "100%", marginTop: 10 }} />
          )}

          <div className="modal-actions">
            <button type="submit">{initialData ? "Update" : "Add"}</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
