import { useState } from "react";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Laptop",       category: "Electronics", stock: 12, price: 850 },
  { id: 2, name: "Office Chair", category: "Furniture",   stock: 3,  price: 120 },
  { id: 3, name: "Printer Ink",  category: "Supplies",    stock: 0,  price: 25 },
  { id: 4, name: "Smartphone",   category: "Electronics", stock: 8,  price: 650 },
  { id: 5, name: "Standing Desk",category: "Furniture",   stock: 6,  price: 300 },
];

const INITIAL_ORDERS = [
  { id: "ORD-001", customer: "Ali Hassan",  product: "Laptop",       total: 1700, status: "Delivered"  },
  { id: "ORD-002", customer: "Sara Khan",   product: "Office Chair", total: 120,  status: "Pending"    },
  { id: "ORD-003", customer: "James Patel", product: "Printer Ink",  total: 125,  status: "Cancelled"  },
  { id: "ORD-004", customer: "Layla Noor",  product: "Smartphone",   total: 650,  status: "Processing" },
  { id: "ORD-005", customer: "Tom Nguyen",  product: "Laptop",       total: 850,  status: "Delivered"  },
];

const Badge = ({ label, cls }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{label}</span>
);

const Card = ({ children, borderColor }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition ${borderColor}`}>
    {children}
  </div>
);

export default function Dashboard() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [orders]   = useState(INITIAL_ORDERS);

  // Stats
  const totalProducts = products.length;
  const inStock       = products.filter(p => p.stock > 5).length;
  const lowStock      = products.filter(p => p.stock > 0 && p.stock <= 5).length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const revenue       = orders.filter(o => o.status === "Delivered").reduce((s, o) => s + o.total, 0);

  // Card labels, values, and colors
  const stats = [
    { label: "Total Products", value: totalProducts, color: "text-blue-600", border: "border-t-4 border-blue-500" },
    { label: "Total Revenue",  value: revenue,       color: "text-green-600", border: "border-t-4 border-green-500" },
    { label: "Low Stock",      value: lowStock,      color: "text-orange-500", border: "border-t-4 border-orange-400" },
    { label: "Pending Orders", value: pendingOrders, color: "text-red-500", border: "border-t-4 border-red-400" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Overview of your inventory and sales</p>
      </div>

      {/* Stat Cards with colored top borders */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <Card key={i} borderColor={s.border} >
            <div className="p-4">
              <h2 className="text-sm font-semibold text-gray-500">{s.label}</h2>
              <p className={`text-3xl font-bold mt-1 ${s.color}`}>
                {s.label === "Total Revenue" ? `$${s.value.toLocaleString()}` : s.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Product & Order Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Products Table */}
        <Card borderColor="border-gray-100">
          <div className="p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Recent Inventory</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Stock</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => {
                  const status = p.stock > 5 ? "bg-blue-100 text-blue-700" :
                                 p.stock > 0 ? "bg-orange-100 text-orange-600" :
                                               "bg-gray-100 text-gray-500";
                  const label  = p.stock > 5 ? "In Stock" :
                                 p.stock > 0 ? "Low Stock" : "Out of Stock";
                  return (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="py-2.5 font-medium text-gray-900">{p.name}</td>
                      <td className="py-2.5 text-gray-500">{p.category}</td>
                      <td className="py-2.5 text-gray-700">{p.stock}</td>
                      <td className="py-2.5"><Badge label={label} cls={status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Orders Table */}
        <Card borderColor="border-gray-100">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-700">Recent Orders</h2>
              <span className="text-xs text-gray-400">
                Revenue: <span className="font-semibold text-gray-700">${revenue.toLocaleString()}</span>
              </span>
            </div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100">
                  <th className="pb-2">Order</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Total</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_ORDERS.map(o => {
                  const statusClasses = {
                    Delivered:  "bg-blue-100 text-blue-700",
                    Pending:    "bg-orange-100 text-orange-600",
                    Processing: "bg-gray-100 text-gray-600",
                    Cancelled:  "bg-red-50 text-red-400",
                  };
                  return (
                    <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="py-2.5 text-blue-600 font-medium">{o.id}</td>
                      <td className="py-2.5 text-gray-700">{o.customer}</td>
                      <td className="py-2.5 text-gray-700">${o.total.toLocaleString()}</td>
                      <td className="py-2.5"><Badge label={o.status} cls={statusClasses[o.status]} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}