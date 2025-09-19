import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../Styles/admin/Services.css";
import ServiceForm from "./components/ServiceForm";

const Services = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("https://rtecsolutionspvtltd.com/api//services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      toast.error("Failed to load services.");
    }
  };

  const handleEdit = (service) => {
    setEditingService({
      ...service,
      keyFeatures: Array.isArray(service.keyFeatures)
        ? service.keyFeatures.join(", ")
        : "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://rtecsolutionspvtltd.com/api//services/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
      toast.success("Service deleted successfully.");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete service.");
    }
  };

  const handleFormSubmit = async (form) => {
    try {
      const formData = new FormData();
      formData.append("title", form.title?.trim() || "");
      formData.append("category", form.category?.trim() || "");
      formData.append("slug", form.slug?.trim() || "");
      formData.append("description", form.description?.trim() || "");

      let featuresArray = [];
      if (typeof form.keyFeatures === "string") {
        featuresArray = form.keyFeatures
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      } else if (Array.isArray(form.keyFeatures)) {
        featuresArray = form.keyFeatures;
      }
      formData.append("keyFeatures", JSON.stringify(featuresArray));

      if (form.icon) formData.append("icon", form.icon);
      if (form.media) formData.append("media", form.media);

      let res;
      if (editingService) {
        res = await axios.put(
          `https://rtecsolutionspvtltd.com/api//services/${editingService._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setServices((prev) =>
          prev.map((s) => (s._id === editingService._id ? res.data : s))
        );
        toast.success("Service updated successfully.");
      } else {
        res = await axios.post("https://rtecsolutionspvtltd.com/api//services", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setServices((prev) => [...prev, res.data]);
        toast.success("Service added successfully.");
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      toast.error("Operation failed. Please try again.");
    }

    setModalOpen(false);
    setEditingService(null);
  };

  const columns = React.useMemo(
    () => [
      { Header: "Title", accessor: "title" },
      { Header: "Category", accessor: "category" },
      { Header: "Slug", accessor: "slug" },
      {
        Header: "Key Features",
        accessor: "keyFeatures",
        Cell: ({ value }) => (Array.isArray(value) ? value.join(", ") : ""),
      },
      {
        Header: "Media",
        accessor: "media",
        Cell: ({ value }) => {
          if (!value || !value.url) return "N/A";
          if (value.resource_type === "video") {
            return (
              <video width="120" controls>
                <source src={value.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            );
          }
          return (
            <img
              src={value.url}
              alt="media"
              style={{ width: "60px", height: "auto", borderRadius: 4 }}
            />
          );
        },
      },
      {
        Header: "Icon",
        accessor: "icon",
        Cell: ({ value }) =>
          value ? (
            <img
              src={value}
              alt="icon"
              style={{ width: "60px", height: "auto", borderRadius: 4 }}
            />
          ) : (
            "N/A"
          ),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="action-btns">
            <button onClick={() => handleEdit(row.original)}>Edit</button>
            <button
              onClick={() => handleDelete(row.original._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: services });

  return (
    <div className="services-page">
      <h2>Manage Services</h2>
      <button className="add-btn" onClick={() => setModalOpen(true)}>
        Add Service
      </button>

      <table {...getTableProps()} className="services-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    data-label={cell.column.Header}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {modalOpen && (
        <ServiceForm
          type="service"
          initialData={editingService}
          onClose={() => {
            setModalOpen(false);
            setEditingService(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Services;
