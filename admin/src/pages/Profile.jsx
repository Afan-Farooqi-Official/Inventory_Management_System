import { useState } from "react";

const INITIAL_PROFILE = {
  name:        "Ali Hassan",
  email:       "ali@inventory.com",
  phone:       "+92 300 1234567",
  role:        "Admin",
  department:  "Management",
  location:    "Karachi, Pakistan",
  bio:         "Inventory system administrator with 5+ years of experience managing warehouse operations.",
  joined:      "January 5, 2024",
  avatarColor: "bg-blue-500",
};

const PERMISSIONS = [
  { label: "Manage Products",    granted: true  },
  { label: "Manage Orders",      granted: true  },
  { label: "Manage Suppliers",   granted: true  },
  { label: "Manage Users",       granted: true  },
  { label: "View Reports",       granted: true  },
  { label: "System Settings",    granted: false },
  { label: "Billing & Payments", granted: false },
  { label: "Export Data",        granted: true  },
];

const ACTIVITY_LOG = [
  { action: "Added new product: Laptop Pro X",   time: "2 hours ago" },
  { action: "Updated supplier: TechWorld Ltd.",  time: "5 hours ago" },
  { action: "Deleted order: ORD-009",            time: "Yesterday"   },
  { action: "Created new user: Sara Khan",       time: "2 days ago"  },
  { action: "Updated category: Electronics",     time: "3 days ago"  },
  { action: "Exported inventory report",         time: "5 days ago"  },
];

const AVATAR_COLORS = ["bg-blue-500","bg-orange-400","bg-gray-500","bg-blue-400","bg-orange-500","bg-indigo-500"];
const TABS = ["Overview","Edit Profile","Security","Permissions","Activity"];

const inputCls = "w-full border border-gray-200 text-gray-800 placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${className}`}>{children}</div>
);

const Badge = ({ label, cls }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{label}</span>
);

const Toggle = ({ on, onChange }) => (
  <button onClick={onChange} className={`w-10 h-5 rounded-full relative flex-shrink-0 transition-colors ${on ? "bg-blue-500" : "bg-gray-300"}`}>
    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? "left-5" : "left-0.5"}`} />
  </button>
);

const SectionTitle = ({ title }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-1 h-4 bg-blue-500 rounded-full" />
    <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label className="text-xs text-gray-500 mb-1 block">{label}</label>
    {children}
  </div>
);

export default function Profile() {
  const [profile,     setProfile]     = useState(INITIAL_PROFILE);
  const [tab,         setTab]         = useState("Overview");
  const [form,        setForm]        = useState({ ...INITIAL_PROFILE });
  const [avatarColor, setAvatarColor] = useState(INITIAL_PROFILE.avatarColor);
  const [saved,       setSaved]       = useState(false);
  const [passwords,   setPw]          = useState({ current: "", newPass: "", confirm: "" });
  const [pwMsg,       setPwMsg]       = useState(null);
  const [security,    setSecurity]    = useState({ twoFA: false, loginNotifs: true, sessionTimeout: true });

  const initials     = profile.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const formInitials = form.name.split(" ").filter(Boolean).map(n => n[0]).join("").toUpperCase().slice(0, 2) || "?";

  const handleSave = () => {
    setProfile({ ...profile, ...form, avatarColor });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePw = () => {
    if (!passwords.current)                      return setPwMsg({ ok: false, text: "Enter your current password." });
    if (passwords.newPass.length < 6)            return setPwMsg({ ok: false, text: "Password must be at least 6 characters." });
    if (passwords.newPass !== passwords.confirm) return setPwMsg({ ok: false, text: "Passwords do not match." });
    setPwMsg({ ok: true, text: "Password updated successfully." });
    setPw({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setPwMsg(null), 3000);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">

      {/* Header */}
      <Card className="mb-6 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-base font-bold flex-shrink-0 ${profile.avatarColor}`}>
              {initials}
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">{profile.name}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{profile.email} · {profile.department}</p>
              <div className="mt-1.5">
                <Badge label={profile.role} cls="bg-blue-100 text-blue-700" />
              </div>
            </div>
          </div>
          <button onClick={() => setTab("Edit Profile")} className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition">
            Edit Profile
          </button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl border border-gray-100 shadow-sm p-1 mb-6 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 min-w-max px-4 py-2 text-sm font-medium rounded-lg transition ${tab === t ? "bg-blue-500 text-white" : "text-gray-500 hover:bg-gray-100"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "Overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="p-5">
            <SectionTitle title="Profile Info" />
            <div className="space-y-3">
              {[["Email", profile.email], ["Phone", profile.phone], ["Department", profile.department], ["Location", profile.location], ["Member Since", profile.joined]].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-sm text-gray-800 font-medium">{value}</p>
                </div>
              ))}
              {profile.bio && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Bio</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
                </div>
              )}
            </div>
          </Card>

          <div className="lg:col-span-2">
            <Card className="p-5">
              <SectionTitle title="Recent Activity" />
              <div className="divide-y divide-gray-50">
                {ACTIVITY_LOG.map((log, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5">
                    <p className="text-sm text-gray-700">{log.action}</p>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{log.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Edit Profile */}
      {tab === "Edit Profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="p-5 flex flex-col items-center gap-5">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold ${avatarColor}`}>
              {formInitials}
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-2 text-center">Avatar color</p>
              <div className="flex flex-wrap justify-center gap-2">
                {AVATAR_COLORS.map(c => (
                  <button key={c} onClick={() => setAvatarColor(c)} className={`w-7 h-7 rounded-full ${c} border-2 transition ${avatarColor === c ? "border-gray-800 scale-110" : "border-transparent"}`} />
                ))}
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2 p-5">
            <SectionTitle title="Personal Information" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[["Full Name","name"],["Email","email"],["Phone","phone"],["Location","location"],["Department","department"]].map(([label, key]) => (
                <Field key={key} label={label}>
                  <input value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} className={inputCls} />
                </Field>
              ))}
              <Field label="Role">
                <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className={inputCls}>
                  {["Admin","Manager","Staff"].map(r => <option key={r}>{r}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Bio">
              <textarea rows={3} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className={`${inputCls} resize-none`} />
            </Field>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              {saved && <p className="text-sm text-blue-600 font-medium">Saved successfully.</p>}
              <div className="flex gap-2 ml-auto">
                <button onClick={() => setForm({...profile})} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Reset</button>
                <button onClick={handleSave} className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition font-semibold">Save Changes</button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Security */}
      {tab === "Security" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="p-5">
            <SectionTitle title="Change Password" />
            <div className="flex flex-col gap-3 mb-4">
              {[["Current Password","current"],["New Password","newPass"],["Confirm Password","confirm"]].map(([label, key]) => (
                <Field key={key} label={label}>
                  <input type="password" value={passwords[key]} onChange={e => setPw({...passwords, [key]: e.target.value})} placeholder="••••••••" className={inputCls} />
                </Field>
              ))}
            </div>
            {pwMsg && <p className={`text-xs font-medium mb-3 ${pwMsg.ok ? "text-blue-600" : "text-red-500"}`}>{pwMsg.text}</p>}
            <button onClick={handlePw} className="w-full py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition font-semibold">
              Update Password
            </button>
          </Card>

          <Card className="p-5">
            <SectionTitle title="Security Settings" />
            <div className="space-y-3">
              {[
                { key: "twoFA",          label: "Two-Factor Authentication", hint: "Extra layer of account security" },
                { key: "loginNotifs",    label: "Login Notifications",        hint: "Alert on new sign-ins"          },
                { key: "sessionTimeout", label: "Session Timeout",            hint: "Auto logout after 30 minutes"   },
              ].map(({ key, label, hint }) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{label}</p>
                    <p className="text-xs text-gray-400">{hint}</p>
                  </div>
                  <Toggle on={security[key]} onChange={() => setSecurity(s => ({ ...s, [key]: !s[key] }))} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Permissions */}
      {tab === "Permissions" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="p-5">
            <SectionTitle title="Access Permissions" />
            <div className="divide-y divide-gray-50">
              {PERMISSIONS.map(p => (
                <div key={p.label} className="flex items-center justify-between py-2.5">
                  <span className="text-sm text-gray-700">{p.label}</span>
                  <Badge label={p.granted ? "Granted" : "Denied"} cls={p.granted ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <SectionTitle title="Role" />
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">A</div>
              <div>
                <p className="font-semibold text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Full system access</p>
              </div>
            </div>
            <div className="space-y-2">
              {["View and edit all modules","Create and delete users","Manage system settings","Generate and export reports"].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 font-bold text-xs">✓</span>{item}
                </div>
              ))}
              {["Cannot access billing","Cannot modify system architecture"].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-gray-300 font-bold text-xs">✗</span>{item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Activity */}
      {tab === "Activity" && (
        <Card className="p-5">
          <SectionTitle title="Activity Log" />
          <div className="divide-y divide-gray-50">
            {ACTIVITY_LOG.map((log, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <p className="text-sm text-gray-700">{log.action}</p>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{log.time}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

    </div>
  );
}