// src/components/layout/MobileBottomNav.jsx
import { NavLink } from "react-router-dom";
import { Home, LayoutGrid, Wallet, ClipboardCheck, BookOpen } from "lucide-react";

const items = [
  { to: "/student/profile", label: "Home", icon: Home },
  { to: "/student/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/student/payment", label: "Payment", icon: Wallet },
  { to: "/student/quiz", label: "Quiz", icon: ClipboardCheck },
  { to: "/student/progress", label: "Progress", icon: BookOpen },
];

export default function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-ink-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40">
      <div className="flex justify-between px-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                isActive ? "text-brand-700" : "text-ink-400"
              }`
            }
          >
            <item.icon size={20} strokeWidth={2} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
