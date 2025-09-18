import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/admin/Testimonials.css";
import TestimonialForm from "./components/TestimonialForm";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      toast.error("Failed to fetch testimonials");
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      toast.success("Testimonial deleted successfully");
    } catch (err) {
      toast.error("Failed to delete testimonial");
    }
  };

  const handleFormSubmit = async (form) => {
    try {
      const data = new FormData();
      data.append("_id", form._id || "");
      data.append("name", form.name);
      data.append("position", form.position);
      data.append("message", form.message);

      if (form.video instanceof File) {
        data.append("video", form.video);
      } else if (form._id) {
        data.append("oldVideo", form.video);
      }

      let res;
      if (form._id) {
        res = await axios.put(
          `http://localhost:5000/api/testimonials/${form._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setTestimonials((prev) =>
          prev.map((t) => (t._id === form._id ? res.data : t))
        );
        toast.success("Testimonial updated successfully");
      } else {
        res = await axios.post("http://localhost:5000/api/testimonials", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setTestimonials((prev) => [...prev, res.data]);
        toast.success("Testimonial added successfully");
      }
    } catch (err) {
      toast.error("Failed to save testimonial");
    }

    setModalOpen(false);
    setEditingTestimonial(null);
  };

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Position", accessor: "position" },
      { Header: "Message", accessor: "message" },
      {
        Header: "Video",
        accessor: "video",
        Cell: ({ value }) =>
          value ? (
            <video
              src={value.startsWith("http") ? value : value.replace("../", "/")}
              width="100"
              controls
            />
          ) : (
            "No video"
          ),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <>
            <button onClick={() => handleEdit(row.original)}>Edit</button>
            <button
              onClick={() => handleDelete(row.original._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: testimonials });

  return (
    <div className="testimonials-page">
      <h2>Manage Testimonials</h2>
      <button
        className="add-btn"
        onClick={() => {
          setEditingTestimonial(null);
          setModalOpen(true);
        }}
      >
        Add Testimonial
      </button>

      <div className="table-wrapper">
        <table {...getTableProps()} className="testimonials-table">
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
                      data-label={cell.column.Header} // ⬅️ mobile label
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <TestimonialForm
          initialData={editingTestimonial}
          onClose={() => {
            setModalOpen(false);
            setEditingTestimonial(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminTestimonials;
