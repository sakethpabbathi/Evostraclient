import React, { useEffect, useState } from 'react';

import axios from 'axios';

export default function ProductForm({ product, onClose }) {
  const [name, setName] = useState(product?.name || '');
  const [sku, setSku] = useState(product?.sku || '');
  const [category, setCategory] = useState(product?.category || '');
  const [price, setPrice] = useState(product?.price || '');
  const [stock, setStock] = useState(product?.stock || 0);
  const [imageFile, setImageFile] = useState(null);

  useEffect(()=> {
    setName(product?.name || '');
    setSku(product?.sku || '');
    setCategory(product?.category || '');
    setPrice(product?.price || '');
    setStock(product?.stock || 0);
  }, [product]);

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('sku', sku);
    form.append('category', category);
    form.append('price', price);
    form.append('stock', stock);
    if (imageFile) form.append('image', imageFile);

    try {
      if (product) {
        await axios.patch(`http://localhost:5000/api/products/${product.id}`, form);
      } else {
        await axios.post('http://localhost:5000/api/products', form);
      }
      onClose();
    } catch (err) {
      alert('Error saving product');
      console.error(err);
    }
  };

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center'
    }}>
      <form onSubmit={submit} style={{ background:'#fff', padding:20, width:420, borderRadius:8 }}>
        <h3>{product ? 'Edit Product' : 'Add Product'}</h3>
        <input required placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="SKU" value={sku} onChange={e=>setSku(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <input type="number" placeholder="Stock" value={stock} onChange={e=>setStock(e.target.value)} />
        <input type="file" onChange={e=>setImageFile(e.target.files[0])} />
        <div style={{ display:'flex', gap:8, marginTop:8 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
