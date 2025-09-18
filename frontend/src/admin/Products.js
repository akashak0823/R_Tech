import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../Styles/admin/Products.css";
import ProductForm from "./components/ProductForm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to fetch products");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({
      _id: product._id,
      name: product.name || "",
      category: product.category || "",
      slug: product.slug || "",
      description: product.description || "",
      details: product.details || "",
      related: Array.isArray(product.related)
        ? product.related.join(", ")
        : product.related || "",
      keyFeatures: Array.isArray(product.keyFeatures)
        ? product.keyFeatures.join(", ")
        : product.keyFeatures || "",
      images: product.images || [],
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete product");
    }
  };

  const handleFormSubmit = async (form) => {
    try {
      const data = new FormData();

      data.append("_id", form._id || "");
      data.append("name", form.name);
      data.append("category", form.category);
      data.append("slug", form.slug);
      data.append("description", form.description);
      data.append("details", form.details);

      const relatedArr =
        typeof form.related === "string"
          ? form.related.split(",").map((r) => r.trim()).filter(Boolean)
          : form.related || [];
      data.append("related", JSON.stringify(relatedArr));

      const keyFeaturesArr =
        typeof form.keyFeatures === "string"
          ? form.keyFeatures.split(",").map((k) => k.trim()).filter(Boolean)
          : form.keyFeatures || [];
      data.append("keyFeatures", JSON.stringify(keyFeaturesArr));

      if (form.images && form.images.length > 0) {
        if (form.images[0] instanceof File) {
          data.append("images", form.images[0]);
        } else if (form._id) {
          data.append("oldImage", form.images[0]);
        }
      }

      let res;
      if (form._id) {
        // Editing
        res = await axios.put(
          `http://localhost:5000/api/products/${form._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setProducts((prev) =>
          prev.map((p) => (p._id === form._id ? res.data : p))
        );
        toast.success("Product updated successfully");
      } else {
        // Adding
        res = await axios.post("http://localhost:5000/api/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts((prev) => [...prev, res.data]);
        toast.success("Product added successfully");
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      toast.error("Failed to save product");
    }

    setModalOpen(false);
    setEditingProduct(null);
  };

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Category", accessor: "category" },
      { Header: "Slug", accessor: "slug" },
      { Header: "Description", accessor: "description" },
      { Header: "Details", accessor: "details" },
      {
        Header: "Related",
        accessor: "related",
        Cell: ({ value }) =>
          Array.isArray(value) ? value.join(", ") : value || "",
      },
      {
        Header: "Image",
        accessor: "images",
        Cell: ({ value }) => {
          if (!value || value.length === 0) return "No image";
          const imgUrl = value[0]?.url || value[0];
          return (
            <img
              src={
                imgUrl?.startsWith("http")
                  ? imgUrl
                  : imgUrl?.replace("../", "/")
              }
              alt="Product"
              className="product-thumb"
            />
          );
        },
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
    useTable({ columns, data: products });

  return (
    <div className="products-page">
      <h2>Manage Products</h2>
      <button
        className="add-btn"
        onClick={() => {
          setEditingProduct(null);
          setModalOpen(true);
        }}
      >
        Add Product
      </button>

      <table {...getTableProps()} className="products-table">
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
        <ProductForm
          initialData={editingProduct}
          onClose={() => {
            setModalOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Products;
