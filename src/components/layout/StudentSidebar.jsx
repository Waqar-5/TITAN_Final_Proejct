// src/components/layout/StudentSidebar.jsx
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  BookOpen,
  CalendarCheck2,
  Wallet,
  FileText,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import SmitLogo from "../ui/SmitLogo";
import { useAuth } from "../../context/useAuth";

const navItems = [
  { to: "/student/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/student/progress", label: "Progress", icon: BookOpen },
  { to: "/student/attendance", label: "Attendance", icon: CalendarCheck2 },
  { to: "/student/payment", label: "Payment", icon: Wallet },
  { to: "/student/assignment", label: "Assignment", icon: FileText },
  { to: "/student/quiz", label: "Quiz", icon: ClipboardCheck },
];

export default function StudentSidebar({ collapsed, onToggle }) {
  const { user } = useAuth();
  const [hovered, setHovered] = useState(null);

  return (
    <aside
      className={`hidden md:flex sticky top-0 h-screen bg-white border-r border-ink-100 shadow-sm transition-all duration-300 ease-in-out flex-col ${
        collapsed ? "w-[76px]" : "w-[220px]"
      }`}
    >
      <div className={`flex items-center px-4 pt-6 pb-4 ${collapsed ? "justify-center" : ""}`}>
        {collapsed ? (
          <span className="text-brand-700 font-extrabold text-2xl">S</span>
        ) : (
          <SmitLogo className="h-10" showTagline={false} />
        )}
      </div>

      <button
        onClick={onToggle}
        className="absolute -right-3 top-7 w-6 h-6 rounded-full bg-white border border-ink-200 shadow-card flex items-center justify-center text-ink-500 hover:text-brand-700 hover:border-brand-300 transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <nav className="flex-1 px-3 mt-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <div
            key={item.to}
            className="relative"
            onMouseEnter={() => setHovered(item.to)}
            onMouseLeave={() => setHovered(null)}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  collapsed ? "justify-center" : ""
                } ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-600 hover:bg-ink-50 hover:text-ink-800"
                }`
              }
            >
              <item.icon size={19} strokeWidth={2} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>

            {collapsed && hovered === item.to && (
              <span className="absolute left-[64px] top-1/2 -translate-y-1/2 whitespace-nowrap bg-ink-900 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-lg z-50 animate-fadeIn">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>

      <NavLink
        to="/student/profile"
        className={`flex items-center gap-3 px-4 py-4 border-t border-ink-100 hover:bg-ink-50 transition-colors ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <img
          src={user?.avatar || "https://api.dicebear.com/7.x/initials/svg?seed=" + (user?.name || "U")}
          alt={user?.name}
          className="w-9 h-9 rounded-full object-cover border border-ink-200"
        />
        {!collapsed && (
          <span className="text-sm font-semibold text-ink-800 truncate">{user?.name}</span>
        )}
      </NavLink>
    </aside>
  );
}
