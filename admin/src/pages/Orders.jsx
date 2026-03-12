import { useState } from "react";

const initialOrders = [
  { id: "ORD-001", customer: "Ali Hassan", product: "Laptop", category: "Electronics", qty: 2, total: 1700, date: "Mar 10, 2026", status: "Delivered" },
  { id: "ORD-002", customer: "Sara Khan", product: "Office Chair", category: "Furniture", qty: 1, total: 120, date: "Mar 11, 2026", status: "Pending" },
  { id: "ORD-003", customer: "James Patel", product: "Printer Ink", category: "Supplies", qty: 5, total: 125, date: "Mar 9, 2026", status: "Cancelled" },
  { id: "ORD-004", customer: "Layla Noor", product: "Smartphone", category: "Electronics", qty: 1, total: 650, date: "Mar 12, 2026", status: "Processing" },
  { id: "ORD-005", customer: "Tom Nguyen", product: "Laptop", category: "Electronics", qty: 1, total: 850, date: "Mar 8, 2026", status: "Delivered" },
  { id: "ORD-006", customer: "Rita Suri", product: "Office Chair", category: "Furniture", qty: 3, total: 360, date: "Mar 7, 2026", status: "Pending" },
];

const statusStyles = {
  Delivered:  "bg-blue-100 text-blue-700",
  Pending:    "bg-orange-100 text-orange-600",
  Processing: "bg-gray-100 text-gray-700",
  Cancelled:  "bg-red-50 text-red-500",
};

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ customer: "", product: "", category: "", qty: "", total: "", status: "Pending" });

  const statuses = ["All", "Delivered", "Pending", "Processing", "Cancelled"];

  const filtered = orders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalOrders   = orders.length;
  const delivered     = orders.filter((o) => o.status === "Delivered").length;
  const pending       = orders.filter((o) => o.status === "Pending").length;
  const revenue       = orders.filter((o) => o.status === "Delivered").reduce((s, o) => s + o.total, 0);

  const handleAdd = () => {
    if (!form.customer || !form.product || !form.qty || !form.total) return;
    const newOrder = {
      ...form,
      id: `ORD-00${orders.length + 1}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      qty: Number(form.qty),
      total: Number(form.total),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setForm({ customer: "", product: "", category: "", qty: "", total: "", status: "Pending" });
    setShowModal(false);
  };

  const confirmDelete = () => {
    setOrders((prev) => prev.filter((o) => o.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-400 mt-1">Track and manage customer orders</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow-sm">
          + New Order
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-t-4 border-blue-500">
          <h2 className="text-sm font-semibold text-gray-500">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600 mt-1">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-t-4 border-blue-300">
          <h2 className="text-sm font-semibold text-gray-500">Delivered</h2>
          <p className="text-3xl font-bold text-blue-500 mt-1">{delivered}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-t-4 border-orange-400">
          <h2 className="text-sm font-semibold text-gray-500">Pending</h2>
          <p className="text-3xl font-bold text-orange-500 mt-1">{pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-t-4 border-gray-400">
          <h2 className="text-sm font-semibold text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold text-gray-600 mt-1">${revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-xl p-4 border border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">All Orders</h2>
          <div className="flex flex-wrap gap-2 items-center">
            {/* Status Filter */}
            <div className="flex gap-1">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1 text-xs rounded-full font-medium transition ${filterStatus === s ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 text-gray-700 placeholder-gray-400 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Product</th>
              <th className="p-2">Category</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Total</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="p-2 text-blue-600 font-medium">{order.id}</td>
                  <td className="p-2 text-gray-900 font-medium">{order.customer}</td>
                  <td className="p-2 text-gray-700">{order.product}</td>
                  <td className="p-2 text-gray-500">{order.category}</td>
                  <td className="p-2 text-gray-700">{order.qty}</td>
                  <td className="p-2 text-gray-700">${order.total.toLocaleString()}</td>
                  <td className="p-2 text-gray-400">{order.date}</td>
                  <td className="p-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition">View</button>
                      <button onClick={() => setDeleteId(order.id)} className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg transition">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={9} className="p-4 text-center text-gray-400">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-900">New Order</h2>
            </div>
            <p className="text-xs text-gray-400 mb-4 ml-3">Fill in the order details below</p>
            <div className="flex flex-col gap-3">
              {[
                { placeholder: "Customer Name", key: "customer", type: "text" },
                { placeholder: "Product", key: "product", type: "text" },
                { placeholder: "Category", key: "category", type: "text" },
                { placeholder: "Quantity", key: "qty", type: "number" },
                { placeholder: "Total ($)", key: "total", type: "number" },
              ].map(({ placeholder, key, type }) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 mb-1 block">{placeholder}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full border border-gray-200 text-gray-800 placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full border border-gray-200 text-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {["Pending", "Processing", "Delivered", "Cancelled"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition font-semibold">Add Order</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3 text-xl">🗑️</div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Delete Order?</h3>
            <p className="text-sm text-gray-400 mb-5">This action cannot be undone.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition font-semibold">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}