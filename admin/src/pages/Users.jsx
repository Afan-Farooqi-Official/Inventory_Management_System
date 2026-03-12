import { useState } from "react";

const INITIAL_USERS = [
  { id: "USR-001", name: "Ali Hassan", email: "ali@inventory.com", phone: "+92 300 1234567", role: "Admin", department: "Management", status: "Active", joined: "Jan 5, 2024", avatar: "AH" },
  { id: "USR-002", name: "Sara Khan", email: "sara@inventory.com", phone: "+92 301 2345678", role: "Manager", department: "Warehouse", status: "Active", joined: "Mar 12, 2023", avatar: "SK" },
  { id: "USR-003", name: "James Patel", email: "james@inventory.com", phone: "+92 302 3456789", role: "Staff", department: "Logistics", status: "Inactive", joined: "Jul 19, 2023", avatar: "JP" },
  { id: "USR-004", name: "Layla Noor", email: "layla@inventory.com", phone: "+92 303 4567890", role: "Manager", department: "Procurement", status: "Active", joined: "Feb 28, 2024", avatar: "LN" },
  { id: "USR-005", name: "Tom Nguyen", email: "tom@inventory.com", phone: "+92 304 5678901", role: "Staff", department: "Warehouse", status: "Active", joined: "Nov 3, 2023", avatar: "TN" },
  { id: "USR-006", name: "Rita Suri", email: "rita@inventory.com", phone: "+92 305 6789012", role: "Staff", department: "Logistics", status: "Inactive", joined: "Aug 14, 2023", avatar: "RS" },
];

const ROLE_COLORS = {
  Admin: "bg-blue-100 text-blue-700",
  Manager: "bg-orange-100 text-orange-600",
  Staff: "bg-gray-100 text-gray-600",
};

const AVATAR_COLORS = ["bg-blue-500","bg-orange-400","bg-gray-500","bg-blue-400","bg-orange-500","bg-gray-400"];
const STATUS_COLORS = { Active: "bg-blue-100 text-blue-700", Inactive: "bg-gray-100 text-gray-500" };
const EMPTY_FORM = { name: "", email: "", phone: "", role: "Staff", department: "", status: "Active" };

const Badge = ({ label, cls }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{label}</span>
);

export default function Users() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const filtered = users.filter(u => 
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.department.toLowerCase().includes(search.toLowerCase()))
    && (filterRole === "All" || u.role === filterRole)
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-400 mt-1">Manage system users and roles</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          Add User
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex gap-2">
            {["All","Admin","Manager","Staff"].map(r => (
              <button key={r} onClick={() => setFilterRole(r)}
                className={`px-3 py-1 text-xs rounded-full font-medium transition ${filterRole === r ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {r}
              </button>
            ))}
          </div>
          <input 
            placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-40"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100">
                {["User","Email","Department","Role","Joined","Status","Actions"].map(h => (
                  <th key={h} className="pb-2 pt-1 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((u,i) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-2.5 pr-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                        {u.avatar}
                      </div>
                      <span className="font-medium text-gray-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-4 text-gray-500">{u.email}</td>
                  <td className="py-2.5 pr-4 text-gray-500">{u.department}</td>
                  <td className="py-2.5 pr-4"><Badge label={u.role} cls={ROLE_COLORS[u.role]} /></td>
                  <td className="py-2.5 pr-4 text-gray-400">{u.joined}</td>
                  <td className="py-2.5 pr-4"><Badge label={u.status} cls={STATUS_COLORS[u.status]} /></td>
                  <td className="py-2.5">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition font-medium">View</button>
                      <button className="px-3 py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition">Edit</button>
                      <button className="px-3 py-1 text-xs text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition">Delete</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} className="py-8 text-center text-gray-400">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}