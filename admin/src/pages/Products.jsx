import { useState } from 'react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Laptop', category: 'Electronics', stock: 12, price: 850 },
  { id: 2, name: 'Office Chair', category: 'Furniture', stock: 3, price: 120 },
  { id: 3, name: 'Printer Ink', category: 'Supplies', stock: 0, price: 25 },
  { id: 4, name: 'Smartphone', category: 'Electronics', stock: 8, price: 650 },
];

const EMPTY_FORM = { name: '', category: '', stock: '', price: '' };

const getStatus = (stock) => {
  if (stock > 5) return { label: 'In Stock', cls: 'bg-blue-100 text-blue-700' };
  if (stock > 0) return { label: 'Low Stock', cls: 'bg-orange-100 text-orange-600' };
  return { label: 'Out of Stock', cls: 'bg-gray-100 text-gray-600' };
};

const Badge = ({ label, cls }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{label}</span>
);

export default function Products() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const openAdd = () => { setEditProduct(null); setForm(EMPTY_FORM); setShowModal(true); };
  const openEdit = (p) => { setEditProduct(p); setForm({ ...p }); setShowModal(true); };
  const handleSubmit = () => {
    if (!form.name || !form.category || form.stock === '' || form.price === '') return;
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === editProduct.id ? { ...form, stock: Number(form.stock), price: Number(form.price) } : p));
    } else {
      setProducts(prev => [...prev, { ...form, id: Date.now(), stock: Number(form.stock), price: Number(form.price) }]);
    }
    setShowModal(false);
  };
  const confirmDelete = () => { setProducts(prev => prev.filter(p => p.id !== deleteId)); setDeleteId(null); };

  const total = products.length;
  const inStock = products.filter(p => p.stock > 5).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  const cardColors = ['blue-500', 'blue-400', 'orange-400', 'gray-400']; // top border colors for summary cards

  return (
    <div className="p-6 min-h-screen bg-gray-50">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your product inventory</p>
        </div>
        <button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow-sm">
          + Add Product
        </button>
      </div>

      {/* Summary Cards with colored borders */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[total, inStock, lowStock, outOfStock].map((value, i) => (
          <div
            key={i}
            className={`bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition border-t-4 border-${cardColors[i]}`}
          >
            <h2 className="text-sm font-semibold text-gray-500">
              {['Total Products','In Stock','Low Stock','Out of Stock'][i]}
            </h2>
            <p className={`text-3xl font-bold text-${cardColors[i]} mt-1`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">All Products</h2>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-200 text-gray-700 placeholder-gray-400 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-400 uppercase text-xs font-semibold">
            <tr>
              {['ID','Product','Category','Stock','Price','Status','Actions'].map(h => (
                <th key={h} className="p-3 text-left border-b border-gray-200">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length>0 ? filtered.map(p=>{
              const status = getStatus(p.stock);
              return (
                <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-3 text-gray-400">#{p.id}</td>
                  <td className="p-3 font-medium text-gray-900">{p.name}</td>
                  <td className="p-3 text-gray-500">{p.category}</td>
                  <td className="p-3 text-gray-700">{p.stock}</td>
                  <td className="p-3 text-gray-700">${p.price}</td>
                  <td className="p-3"><Badge label={status.label} cls={status.cls}/></td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button onClick={()=>openEdit(p)} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition">Edit</button>
                      <button onClick={()=>setDeleteId(p.id)} className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg transition">Delete</button>
                    </div>
                  </td>
                </tr>
              )
            }) : (
              <tr><td colSpan={7} className="p-6 text-center text-gray-400">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}