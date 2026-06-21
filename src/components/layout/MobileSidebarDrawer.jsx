// src/components/layout/MobileSidebarDrawer.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { X, LayoutGrid, BookOpen, CalendarCheck2, Wallet, FileText, ClipboardCheck, User, LogOut } from "lucide-react";
import SmitLogo from "../ui/SmitLogo";
import { useAuth } from "../../context/useAuth";

const navItems = [
  { to: "/student/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/student/progress", label: "Progress", icon: BookOpen },
  { to: "/student/attendance", label: "Attendance", icon: CalendarCheck2 },
  { to: "/student/payment", label: "Payment", icon: Wallet },
  { to: "/student/assignment", label: "Assignment", icon: FileText },
  { to: "/student/quiz", label: "Quiz", icon: ClipboardCheck },
  { to: "/student/profile", label: "Profile", icon: User },
];

export default function MobileSidebarDrawer({ open, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="md:hidden fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 animate-fadeIn" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-[78%] max-w-[300px] bg-white shadow-xl flex flex-col animate-fadeIn">
        <div className="flex items-center justify-between px-4 py-5 border-b border-ink-100">
          <SmitLogo className="h-9" showTagline={false} />
          <button onClick={onClose} className="p-1.5 rounded-md text-ink-500 hover:bg-ink-100" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-brand-50 text-brand-700" : "text-ink-600 hover:bg-ink-50"
                }`
              }
            >
              <item.icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-4 border-t border-ink-100 text-rose-600 text-sm font-semibold"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
