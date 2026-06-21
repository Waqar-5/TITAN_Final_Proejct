// src/components/layout/Topbar.jsx
import { Home, ChevronRight, MessageSquare, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Topbar({ breadcrumb = [], onMenuClick }) {
  return (
    <header className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 bg-ink-50/60">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 rounded-md text-ink-600 hover:bg-ink-100"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <nav className="flex items-center gap-1.5 text-sm text-ink-500 min-w-0 overflow-hidden">
          <Link to="/student/dashboard" className="flex items-center gap-1.5 hover:text-brand-700 shrink-0">
            <Home size={15} />
            <span>Home</span>
          </Link>
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5 min-w-0">
              <ChevronRight size={14} className="shrink-0 text-ink-300" />
              <span
                className={
                  i === breadcrumb.length - 1
                    ? "font-semibold text-ink-800 truncate"
                    : "truncate hover:text-brand-700"
                }
              >
                {crumb}
              </span>
            </span>
          ))}
        </nav>
      </div>

      <button className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-ink-200 bg-white text-sm font-medium text-ink-700 hover:border-brand-300 hover:text-brand-700 transition-colors">
        <MessageSquare size={15} />
        <span className="hidden sm:inline">Feedback</span>
      </button>
    </header>
  );
}
