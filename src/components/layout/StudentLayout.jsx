// src/components/layout/StudentLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import Topbar from "./Topbar";
import MobileBottomNav from "./MobileBottomNav";
import MobileSidebarDrawer from "./MobileSidebarDrawer";
import useBreadcrumb from "../../hooks/useBreadcrumb";

export default function StudentLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const breadcrumb = useBreadcrumb();

  return (
    <div className="flex h-screen bg-ink-50 relative">
      <StudentSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <MobileSidebarDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <Topbar breadcrumb={breadcrumb} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 sm:px-6 pb-24 md:pb-8 animate-fadeIn">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
