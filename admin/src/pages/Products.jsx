import React, { useState } from 'react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', stock: 12, price: 850 },
    { id: 2, name: 'Office Chair', category: 'Furniture', stock: 3, price: 120 },
    { id: 3, name: 'Printer Ink', category: 'Supplies', stock: 0, price: 25 },
    { id: 4, name: 'Smartphone', category: 'Electronics', stock: 8, price: 650 },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen-[14] relative">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="flex items-center mb-6 space-x-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          + Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className={`bg-white shadow rounded-lg p-4 transition ${showForm ? 'blur-sm' : ''}`}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Product</th>
              <th className="p-2">Category</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Price</th>
              <th className="p-2">Status</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-2">{product.id}</td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">${product.price}</td>
                <td
                  className={`p-2 font-semibold ${
                    product.stock > 5
                      ? 'text-green-600'
                      : product.stock > 0
                      ? 'text-orange-500'
                      : 'text-red-600'
                  }`}
                >
                  {product.stock > 5
                    ? 'In Stock'
                    : product.stock > 0
                    ? 'Low Stock'
                    : 'Out of Stock'}
                </td>
                <td className="p-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overlay Form */}
      {showForm && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form className="space-y-3">
              <input
                type="text"
                defaultValue={editProduct?.name || ''}
                placeholder="Product Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                defaultValue={editProduct?.category || ''}
                placeholder="Category"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                defaultValue={editProduct?.stock || ''}
                placeholder="Stock Quantity"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                defaultValue={editProduct?.price || ''}
                placeholder="Price"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  {editProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;