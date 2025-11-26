import React, { useEffect, useMemo, useState } from 'react';

import ProductList from "./ProductList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState({ show: false, productId: null });

  const [products, setProducts] = useState([]);
  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all"); // 'all', 'low', 'medium', 'high'

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null); // non-blocking feedback

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    stock: "",
    price: "",
    image: null,
  });

  const showFeedback = (message, type = 'success') => {
    setFeedbackMessage({ message, type });
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const data = res.data;
      setProducts(data);
      setStats({
        total: data.length,
        low: data.filter(p => p.stock < 10).length,
        out: data.filter(p => p.stock === 0).length,
        categories: 0
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      stock: product.stock,
      price: product.price,
      image: null,
    });
    setShowForm(true);
  };

  const handleDeleteClick = (productId) => {
    setConfirmDelete({ show: true, productId });
  };

  const confirmDeleteAction = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${confirmDelete.productId}`);
      showFeedback("Product Deleted Successfully", 'success');
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
      showFeedback("Error deleting product", 'error');
    }
    setConfirmDelete({ show: false, productId: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    if (!editingProduct) {
      fd.append("id", formData.id);
    }

    fd.append("name", formData.name);
    fd.append("stock", formData.stock);
    fd.append("price", formData.price);

    if (formData.image) {
      fd.append("image", formData.image);
    }

    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        showFeedback("Product Updated Successfully!", 'success');
      } else {
        await axios.post("http://localhost:5000/api/products", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        showFeedback("Product Added Successfully!", 'success');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showFeedback(`An error occurred: ${error.response ? error.response.data.message : error.message}`, 'error');
    }

    setShowForm(false);
    setEditingProduct(null);
    setFormData({ id: "", name: "", stock: "", price: "", image: null });

    fetchData(); // Refresh the product list
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({ id: "", name: "", stock: "", price: "", image: null });
  };

  // --- Filtering Logic ---
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      let matchesPrice = true;
      const price = parseFloat(product.price);

      switch (priceFilter) {
        case 'low':
          matchesPrice = price < 50;
          break;
        case 'medium':
          matchesPrice = price >= 50 && price < 200;
          break;
        case 'high':
          matchesPrice = price >= 200;
          break;
        case 'all':
        default:
          matchesPrice = true;
          break;
      }

      return matchesSearch && matchesPrice;
    });
  }, [products, searchTerm, priceFilter]);
  // -----------------------

  return (
    <div className="dashboard">
      <style>{`
        :root{
          --bg:#0f172a; --card:#0b1220; --accent1:#7c3aed; --accent2:#06b6d4; --muted:rgba(255,255,255,0.75);
        }
        *{box-sizing:border-box  }
        .dashboard{min-height:100vh; background: linear-gradient(180deg,var(--bg) 0%, #071033 100%); color:var(--muted); font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding:28px 16px;}
        .dashboard-content{max-width:1200px;margin:0 auto;}

        h2{font-size:1.6rem; margin:0 0 10px; color: #fff; display:flex; align-items:center; gap:10px}

        .actions-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:18px}

        .add-btn{background:linear-gradient(90deg,var(--accent1), #ef4444); color:white; border:none;padding:10px 18px;border-radius:12px;cursor:pointer;box-shadow:0 8px 20px rgba(124,58,237,0.16);font-weight:700;display:inline-flex;align-items:center;gap:8px}
        .add-btn:hover{transform:translateY(-3px);transition:all .18s ease}

        .home-btn{background:transparent;border:1px solid rgba(255,255,255,0.08);color:var(--muted);padding:10px 14px;border-radius:10px;cursor:pointer}
        .home-btn:hover{background:rgba(255,255,255,0.03)}

        .filter-group{display:flex;gap:10px;align-items:center;margin-left:auto}
        .filter-group input,.filter-group select{background:transparent;border:1px solid rgba(255,255,255,0.08);color:var(--muted);padding:9px 12px;border-radius:10px;min-width:160px}
        .filter-group input::placeholder{color:rgba(255,255,255,0.45)}

        .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:18px 0}
        .card{background:linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));padding:18px;border-radius:14px;box-shadow:0 6px 18px rgba(2,6,23,0.6);display:flex;flex-direction:column;align-items:flex-start;gap:6px;border-left:6px solid var(--accent2)}
        .card strong{font-size:1.1rem;color:#fff}
        .card small{color:rgba(255,255,255,0.6)}

        /* Product list wrapper for responsive layout */
        .product-list-wrap{margin-top:12px;background:linear-gradient(180deg, rgba(255,255,255,0.02), transparent);padding:14px;border-radius:12px}

        /* Modal + form */
        .modal{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(0deg, rgba(2,6,23,0.7), rgba(2,6,23,0.7));z-index:1200}
        .product-form{background:linear-gradient(180deg,#071033 0%, #071c2a 100%);padding:22px;border-radius:12px;box-shadow:0 20px 60px rgba(2,6,23,0.7);width:92%;max-width:460px;display:flex;flex-direction:column;gap:12px;color:var(--muted);border:1px solid rgba(255,255,255,0.04)}
        .product-form h3{margin:0;color:#fff}
        .product-form p{margin:0;color:rgba(255,255,255,0.65)}
        .product-form input[type="text"], .product-form input[type="number"], .product-form input[type="file"], .product-form select{
          background:transparent;border:1px solid rgba(255,255,255,0.06);padding:10px;border-radius:8px;color:var(--muted);width:100%;
        }
        .product-form label{font-size:0.9rem;color:rgba(255,255,255,0.8)}
        .product-form button{padding:10px 12px;border-radius:10px;border:none;cursor:pointer;font-weight:700}
        .product-form button[type="submit"]{background:linear-gradient(90deg,var(--accent2), #60a5fa);color:#06202a}
        .product-form button[type="button"]{background:transparent;border:1px solid rgba(255,255,255,0.06);color:var(--muted)}

        /* feedback */
        .feedback{position:fixed;top:18px;right:18px;padding:12px 18px;border-radius:12px;color:#06202a;font-weight:800;z-index:2000;box-shadow:0 8px 30px rgba(2,6,23,0.6)}
        .feedback.success{background:linear-gradient(90deg,#bbf7d0,#86efac)}
        .feedback.error{background:linear-gradient(90deg,#fecaca,#fca5a5);color:#4b0404}

        /* Confirm delete small form */
        .confirm-box{display:flex;flex-direction:column;gap:12px}

        /* Responsive rules */
        @media (max-width: 960px){
          .stats-row{grid-template-columns:repeat(2,1fr)}
          .filter-group{width:100%;order:2;justify-content:space-between}
        }
        @media (max-width: 640px){
          h2{font-size:1.2rem}
          .stats-row{grid-template-columns:1fr}
          .add-btn{width:100%}
          .filter-group{flex-direction:column;align-items:stretch}
        }

        /* Fancy subtle animations for product items (ProductList should use these classes) */
        .product-card{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border-radius:12px;padding:12px;display:flex;gap:12px;align-items:center;border:1px solid rgba(255,255,255,0.03);transition:transform .18s ease, box-shadow .18s ease}
        .product-card:hover{transform:translateY(-6px);box-shadow:0 14px 40px rgba(2,6,23,0.6)}
        .product-thumb{width:64px;height:64px;border-radius:10px;object-fit:cover;border:1px solid rgba(255,255,255,0.04)}
        .product-meta{flex:1;}
        .product-actions{display:flex;gap:8px}
        .btn-sm{padding:8px 10px;border-radius:8px;border:none;cursor:pointer;font-weight:700}
        .btn-edit{background:linear-gradient(90deg,#f59e0b,#ef4444);color:#06202a}
        .btn-delete{background:linear-gradient(90deg,#ef4444,#be123c);color:#fff}

      `}</style>

      <div className="dashboard-content">
        <h2>Welcome Manager ⭐</h2>

        <div className="actions-row">
          <button className="add-btn" onClick={() => {
              setEditingProduct(null);
              setFormData({ id: "", name: "", stock: "", price: "", image: null });
              setShowForm(true);
            }}
          >
            ➕ Add Product
          </button>

          <div className="filter-group">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="low">Low ( &lt; $50)</option>
              <option value="medium">Medium ($50 - $199)</option>
              <option value="high">High ($200+)</option>
            </select>
          </div>

          <button className="home-btn" onClick={() => navigate("/")}>🏠 Home</button>
        </div>

        {feedbackMessage && (
            <div className={`feedback ${feedbackMessage.type}`}>
                {feedbackMessage.message}
            </div>
        )}

        {showForm && (
          <div className="modal">
            <form className="product-form" onSubmit={handleSubmit}>
              <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>

              {editingProduct && (
                <p>Product ID: <strong>{editingProduct.id}</strong></p>
              )}

              {!editingProduct && (
                  <input type="number" placeholder="Product ID (Manual)" required
                      value={formData.id}
                      onChange={e => setFormData({ ...formData, id: e.target.value })} />
              )}

              <input type="text" placeholder="Product Name" required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })} />

              <input type="number" placeholder="Stock" required
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: e.target.value })} />

              <input type="number" placeholder="Price" required
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })} />

              <label>{editingProduct ? "New Image (Optional)" : "Product Image"}</label>
              <input type="file"
                required={!editingProduct}
                onChange={e => setFormData({ ...formData, image: e.target.files[0] })} />

              <div style={{display:'flex',gap:10}}>
                <button type="submit">{editingProduct ? "Update" : "Save"}</button>
                <button type="button" onClick={closeForm}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="stats-row">
          <div className="card"><small>Total Products</small><strong>{stats.total ?? 0}</strong></div>
          <div className="card" style={{borderLeftColor:'#f59e0b'}}><small>Low Stock</small><strong>{stats.low ?? 0}</strong></div>
          <div className="card" style={{borderLeftColor:'#ef4444'}}><small>Out of Stock</small><strong>{stats.out ?? 0}</strong></div>
          <div className="card" style={{borderLeftColor:'#7c3aed'}}><small>Categories</small><strong>{stats.categories ?? 0}</strong></div>
        </div>

        <div className="product-list-wrap">
          <ProductList
            products={filteredProducts}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </div>

        {confirmDelete.show && (
          <div className="modal">
            <div className="product-form confirm-box">
              <h3>Delete Product ❌</h3>
              <p>Are you sure you want to delete this product?</p>

              <div style={{display:'flex',gap:10}}>
                <button
                  style={{ background: "linear-gradient(90deg,#ef4444,#be123c)", color: "#fff", flex:1 }}
                  onClick={confirmDeleteAction}
                >
                  Yes, Delete
                </button>

                <button
                  style={{ background: "transparent", color: "var(--muted)", border: '1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'10px 12px', flex:1 }}
                  onClick={() => setConfirmDelete({ show: false, productId: null })}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
