import { useState } from "react";

const INITIAL_CATEGORIES = [
  { id: 1, name: "Electronics", manager: "Sarah Ahmed",  products: 342, lastUpdated: "Mar 10, 2026", status: "Active"   },
  { id: 2, name: "Furniture",   manager: "James Patel",  products: 185, lastUpdated: "Mar 9, 2026",  status: "Active"   },
  { id: 3, name: "Supplies",    manager: "Layla Hassan", products: 512, lastUpdated: "Mar 11, 2026", status: "Active"   },
  { id: 4, name: "Apparel",     manager: "Tom Nguyen",   products: 98,  lastUpdated: "Mar 7, 2026",  status: "Inactive" },
  { id: 5, name: "Tools",       manager: "Rita Suri",    products: 224, lastUpdated: "Mar 8, 2026",  status: "Active"   },
  { id: 6, name: "Networking",  manager: "Omar Khalil",  products: 76,  lastUpdated: "Mar 5, 2026",  status: "Active"   },
];

const EMPTY_FORM = { name: "", manager: "", status: "Active" };

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${className}`}>{children}</div>
);

const Badge = ({ label, cls }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{label}</span>
);

const Modal = ({ onClose, children }) => (
  <div className="fixed inset-0 bg-gray-300 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">{children}</div>
  </div>
);

const inputCls = "w-full border border-gray-200 text-gray-800 placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300";

export default function Categories() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [search,     setSearch]     = useState("");
  const [modal,      setModal]      = useState(null); // "add" | "edit" | "delete"
  const [active,     setActive]     = useState(null);
  const [form,       setForm]       = useState(EMPTY_FORM);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.manager.toLowerCase().includes(search.toLowerCase())
  );

  const total    = categories.length;
  const active_  = categories.filter(c => c.status === "Active").length;
  const inactive = categories.filter(c => c.status === "Inactive").length;
  const totalProducts = categories.reduce((s, c) => s + c.products, 0);

  const openAdd  = () => { setActive(null); setForm(EMPTY_FORM); setModal("add"); };
  const openEdit = (c) => { setActive(c); setForm({ name: c.name, manager: c.manager, status: c.status }); setModal("edit"); };
  const openDel  = (c) => { setActive(c); setModal("delete"); };
  const close    = () => { setModal(null); setActive(null); };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (modal === "edit") {
      setCategories(prev => prev.map(c => c.id === active.id ? { ...c, ...form, lastUpdated: "Mar 12, 2026" } : c));
    } else {
      setCategories(prev => [...prev, { ...form, id: Date.now(), products: 0, lastUpdated: "Mar 12, 2026" }]);
    }
    close();
  };

  const handleDelete = () => {
    setCategories(prev => prev.filter(c => c.id !== active.id));
    close();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage your inventory categories</p>
        </div>
        <button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          + Add Category
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Categories", value: total,         color: "text-blue-600",   border: "border-blue-500"   },
          { label: "Active",           value: active_,       color: "text-blue-500",   border: "border-blue-300"   },
          { label: "Inactive",         value: inactive,      color: "text-orange-500", border: "border-orange-400" },
          { label: "Total Products",   value: totalProducts, color: "text-gray-600",   border: "border-gray-400"   },
        ].map(s => (
          <Card key={s.label} className={`p-4 border-t-4 ${s.border}`}>
            <p className="text-sm font-medium text-gray-400">{s.label}</p>
            <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">All Categories</h2>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-44"
          />
        </div>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100">
              <th className="pb-2 pt-1">Name</th>
              <th className="pb-2 pt-1">Manager</th>
              <th className="pb-2 pt-1">Products</th>
              <th className="pb-2 pt-1">Last Updated</th>
              <th className="pb-2 pt-1">Status</th>
              <th className="pb-2 pt-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? filtered.map(c => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="py-2.5 font-medium text-gray-900">{c.name}</td>
                <td className="py-2.5 text-gray-500">{c.manager}</td>
                <td className="py-2.5 text-blue-600 font-semibold">{c.products}</td>
                <td className="py-2.5 text-gray-400 text-xs">{c.lastUpdated}</td>
                <td className="py-2.5">
                  <Badge label={c.status} cls={c.status === "Active" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"} />
                </td>
                <td className="py-2.5">
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(c)} className="text-xs text-blue-600 font-medium hover:underline">Edit</button>
                    <button onClick={() => openDel(c)}  className="text-xs text-orange-500 font-medium hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={6} className="py-8 text-center text-gray-400">No categories found.</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <Modal onClose={close}>
          <div className="p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">{modal === "edit" ? "Edit Category" : "Add Category"}</h2>
            <div className="flex flex-col gap-3 mb-5">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Category Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Electronics" className={inputCls} />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Manager</label>
                <input value={form.manager} onChange={e => setForm({...form, manager: e.target.value})} placeholder="e.g. John Doe" className={inputCls} />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className={inputCls}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={close} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition font-semibold">
                {modal === "edit" ? "Update" : "Add Category"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {modal === "delete" && active && (
        <Modal onClose={close}>
          <div className="p-6 text-center">
            <h3 className="text-base font-bold text-gray-900 mb-1">Delete Category?</h3>
            <p className="text-sm text-gray-400 mb-6">"{active.name}" will be permanently removed.</p>
            <div className="flex justify-center gap-3">
              <button onClick={close} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition font-semibold">Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}