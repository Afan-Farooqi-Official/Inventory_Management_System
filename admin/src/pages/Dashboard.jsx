import React from 'react';

const Dashboard = () => {

  const inventory = [ 
    { product: 'Laptop', category: 'Electronics', stock: 12, status: 'In Stock', statusColor: 'text-green-600' },
    { product: 'Office Chair', category: 'Furniture', stock: 3, status: 'Low Stock', statusColor: 'text-red-500' }, 
    { product: 'Printer Ink', category: 'Supplies', stock: 0, status: 'Out of Stock', statusColor: 'text-gray-500' }, 
  ];

  return (
    <div className="p-6 min-h-screen-[14]">
      
      <h1 className="text-2xl font-bold mb-6">Inventory Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600">1,245</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Low Stock Items</h2>
          <p className="text-3xl font-bold text-red-600">32</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <p className="text-3xl font-bold text-orange-600">18</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-3xl font-bold text-green-600">$54,000</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Inventory</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Product</th>
              <th className="p-2">Category</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.product}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.stock}</td>
                <td className={`p-2 font-semibold ${item.statusColor}`}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
