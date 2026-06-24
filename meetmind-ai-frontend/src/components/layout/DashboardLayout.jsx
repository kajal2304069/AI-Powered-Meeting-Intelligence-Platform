import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

// ─── DashboardLayout ─────────────────────────────────────────────────────
// Shared shell for every authenticated page: sidebar on the left, the
// active route's page rendered on the right via <Outlet />.

export default function DashboardLayout({ onLogout }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F7F6F4", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <Sidebar onLogout={onLogout} />
      <main style={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
