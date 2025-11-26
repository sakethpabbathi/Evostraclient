import React from 'react';

export default function StatsCards({ stats }) {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <div className="stat-card">Total Products <h3>{stats.totalProducts}</h3></div>
      <div className="stat-card">Low Stock (&lt;10) <h3>{stats.lowStock}</h3></div>
      <div className="stat-card">Total Categories <h3>{stats.totalCategories}</h3></div>
      <div className="stat-card">Out of Stock <h3>{stats.outOfStock}</h3></div>
    </div>
  );
}
