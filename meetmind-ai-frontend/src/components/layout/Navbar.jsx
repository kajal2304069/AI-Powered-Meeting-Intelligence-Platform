// ─── Navbar ──────────────────────────────────────────────────────────────
// A slim top bar that sits above the page content inside DashboardLayout.
// The original single-file design didn't have a top bar (the sidebar did
// all the work), so this stays minimal — just a page title slot — and can
// be extended later (breadcrumbs, search, notifications) without touching
// every page.

export default function Navbar({ title, subtitle }) {
  if (!title) return null;

  return (
    <div
      style={{
        padding: "16px 36px",
        borderBottom: "0.5px solid #E8E7E2",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#2C2C2A" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: "#888780" }}>{subtitle}</div>}
      </div>
    </div>
  );
}
