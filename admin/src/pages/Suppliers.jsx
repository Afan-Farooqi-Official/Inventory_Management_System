import { useState } from "react";

const INITIAL_SUPPLIERS = [
  { id: "SUP-001", name: "TechWorld Ltd.", contact: "Ali Hassan",  email: "ali@techworld.com",   phone: "+92 300 1234567", category: "Electronics", products: 45, status: "Active",   joined: "Jan 5, 2024"  },
  { id: "SUP-002", name: "FurniCo",        contact: "Sara Khan",   email: "sara@furnico.com",    phone: "+92 301 2345678", category: "Furniture",   products: 28, status: "Active",   joined: "Mar 12, 2023" },
  { id: "SUP-003", name: "SupplyHub",      contact: "James Patel", email: "james@supplyhub.com", phone: "+92 302 3456789", category: "Supplies",    products: 63, status: "Inactive", joined: "Jul 19, 2023" },
  { id: "SUP-004", name: "NetGear Pro",    contact: "Layla Noor",  email: "layla@netgear.com",   phone: "+92 303 4567890", category: "Networking",  products: 19, status: "Active",   joined: "Feb 28, 2024" },
  { id: "SUP-005", name: "ToolMasters",    contact: "Tom Nguyen",  email: "tom@toolmasters.com", phone: "+92 304 5678901", category: "Tools",       products: 37, status: "Active",   joined: "Nov 3, 2023"  },
  { id: "SUP-006", name: "WearZone",       contact: "Rita Suri",   email: "rita@wearzone.com",   phone: "+92 305 6789012", category: "Apparel",     products: 22, status: "Inactive", joined: "Aug 14, 2023" },
];

const EMPTY_FORM = { name: "", contact: "", email: "", phone: "", category: "", products: "", status: "Active" };

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>{children}</div>
);

const Badge = ({ label, cls }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{label}</span>
);

const Modal = ({ children }) => (
  <div className="fixed inset-0 bg-gray-300 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">{children}</div>
  </div>
);

const inputCls = "w-full border border-gray-200 text-gray-800 placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300";
const statusCls = (s) => s === "Active" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null); // "add" | "edit" | "view" | "delete"
  const [active, setActive] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = suppliers.filter(s => {
    const q = search.toLowerCase();
    const ms = s.name.toLowerCase().includes(q) || s.contact.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
    return ms && (filter === "All" || s.status === filter);
  });

  const openAdd  = () => { setActive(null); setForm(EMPTY_FORM); setModal("add"); };
  const openEdit = (s) => { setActive(s); setForm({ name: s.name, contact: s.contact, email: s.email, phone: s.phone, category: s.category, products: s.products, status: s.status }); setModal("edit"); };
  const openView = (s) => { setActive(s); setModal("view"); };
  const openDel  = (s) => { setActive(s); setModal("delete"); };
  const close    = () => { setModal(null); setActive(null); };

  const handleSubmit = () => {
    if (!form.name || !form.contact || !form.email || !form.category) return;
    if (modal === "edit") {
      setSuppliers(prev => prev.map(s => s.id === active.id ? { ...s, ...form, products: Number(form.products) } : s));
    } else {
      setSuppliers(prev => [...prev, {
        ...form,
        id: `SUP-${String(prev.length + 1).padStart(3, "0")}`,
        products: Number(form.products),
        joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      }]);
    }
    close();
  };

  const handleDelete = () => {
    setSuppliers(prev => prev.filter(s => s.id !== active.id));
    close();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage your supplier relationships</p>
        </div>
        <button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          + Add Supplier
        </button>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-2">
          {["All","Active","Inactive"].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1 text-xs rounded-full font-medium transition ${filter === s ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {s}
            </button>
          ))}
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-40" />
      </div>

      {/* Table */}
      <Card className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100">
                {["ID","Supplier","Contact","Category","Products","Joined","Status","Actions"].map(h => (
                  <th key={h} className="pb-2 pt-1 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(s => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-2.5 pr-4 text-blue-600 font-medium text-xs">{s.id}</td>
                  <td className="py-2.5 pr-4">
                    <p className="font-medium text-gray-900">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.email}</p>
                  </td>
                  <td className="py-2.5 pr-4 text-gray-600">{s.contact}</td>
                  <td className="py-2.5 pr-4 text-gray-500">{s.category}</td>
                  <td className="py-2.5 pr-4 text-gray-700">{s.products}</td>
                  <td className="py-2.5 pr-4 text-gray-400 text-xs">{s.joined}</td>
                  <td className="py-2.5 pr-4"><Badge label={s.status} cls={statusCls(s.status)} /></td>
                  <td className="py-2.5">
                    <div className="flex gap-2">
                      <button onClick={() => openView(s)} className="px-3 py-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition font-medium">View</button>
                      <button onClick={() => openEdit(s)} className="px-3 py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition">Edit</button>
                      <button onClick={() => openDel(s)}  className="px-3 py-1 text-xs text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition">Delete</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={8} className="py-8 text-center text-gray-400">No suppliers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <Modal>
          <div className="p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">{modal === "edit" ? "Edit Supplier" : "Add Supplier"}</h2>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">Supplier Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Company name" className={inputCls} />
              </div>
              {[
                ["Contact Person","contact","text"],
                ["Email","email","email"],
                ["Phone","phone","text"],
                ["No. of Products","products","number"]
              ].map(([label,key,type]) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                  <input type={type} value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} className={inputCls} />
                </div>
              ))}
              {/* Category dropdown */}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                  className={inputCls}
                >
                  <option value="">Select Category</option>
                  {["Electronics", "Furniture", "Supplies", "Networking", "Tools", "Apparel"].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              {/* Status */}
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
                {modal === "edit" ? "Update" : "Add Supplier"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* View Modal */}
      {modal === "view" && active && (
        <Modal>
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900">{active.name}</h3>
              <p className="text-xs text-gray-400">{active.id} · {active.category}</p>
            </div>
            <div className="divide-y divide-gray-100 mb-5">
              {[["Contact",active.contact],["Email",active.email],["Phone",active.phone],["Products",active.products],["Joined",active.joined],["Status",active.status]].map(([label,value]) => (
                <div key={label} className="flex justify-between py-2.5">
                  <span className="text-xs text-gray-400">{label}</span>
                  <span className={`text-sm font-medium ${label === "Status" ? (value === "Active" ? "text-blue-600" : "text-gray-400") : "text-gray-700"}`}>{value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => { close(); openEdit(active); }} className="flex-1 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium">Edit</button>
              <button onClick={close} className="flex-1 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition font-semibold">Close</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {modal === "delete" && active && (
        <Modal>
          <div className="p-6 text-center">
            <h3 className="text-base font-bold text-gray-900 mb-1">Delete Supplier?</h3>
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