import React from "react";

// This component displays the list of products in a table and provides Edit/Delete actions.
export default function ProductList({ products, onEdit, onDelete }) {
  // Styles for the ProductList component (using Tailwind-like structure for clarity)
  const styles = {
    container: "p-4 bg-white rounded-lg shadow-lg mt-8",
    title: "text-2xl font-bold mb-4 border-b pb-2",
    table: "min-w-full divide-y divide-gray-200",
    header: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50",
    cell: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
    image: "w-12 h-12 object-cover rounded-md shadow-sm",
    button: "text-white font-semibold py-1 px-3 rounded-full transition duration-150 ease-in-out hover:opacity-80",
    editBtn: "bg-blue-600",
    deleteBtn: "bg-red-600 ml-2",
    noProducts: "text-center text-gray-500 py-10"
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Product Inventory</h2>

      {products.length === 0 ? (
        <p className={styles.noProducts}>No products available in the database.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className={styles.table}>
            <thead className="bg-gray-50">
              <tr>
                <th className={styles.header}>Image</th>
                <th className={styles.header}>ID</th>
                <th className={styles.header}>Name</th>
                <th className={styles.header}>Stock</th>
                <th className={styles.header}>Price</th>
                <th className={styles.header}>Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((p) => (
                // Using p.id for the key
                <tr key={p.id} className="hover:bg-gray-50"> 
                  <td className={styles.cell}>
                    <img 
                      src={p.image || "https://placehold.co/48x48/CCCCCC/333333?text=N/A"} 
                      alt={p.name} 
                      className={styles.image}
                      onError={(e) => {
                        // Fallback image if the URL is broken
                        e.target.onerror = null; 
                        e.target.src = "https://placehold.co/48x48/CCCCCC/333333?text=N/A";
                      }}
                    />
                  </td>
                  <td className={styles.cell}>{p.id}</td>
                  <td className={styles.cell + " font-medium"}>{p.name}</td>
                  <td className={styles.cell}>{p.stock}</td>
                  <td className={styles.cell}>₹{p.price}</td>
                  <td className={styles.cell}>
                    <button 
                      className={`${styles.button} ${styles.editBtn}`} 
                      onClick={() => onEdit(p)}
                    >
                      Edit
                    </button>
                    <button 
                      className={`${styles.button} ${styles.deleteBtn}`}
                      onClick={() => onDelete(p.id)} // Calls the handleDeleteClick in AdminDashboard
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}