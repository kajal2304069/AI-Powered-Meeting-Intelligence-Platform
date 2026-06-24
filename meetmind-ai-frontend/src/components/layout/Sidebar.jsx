import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "../common/Avatar";

// ─── Sidebar ────────────────────────────────────────────────────────────────
const NAV = [
  { to: "/dashboard", icon: "⊞", label: "Dashboard" },
  { to: "/meetings", icon: "🎙", label: "Meetings" },
  { to: "/tasks", icon: "✓", label: "Tasks" },
  { to: "/analytics", icon: "📊", label: "Analytics" },
  { to: "/search", icon: "🔍", label: "AI Search" },
  { to: "/executive", icon: "👔", label: "Executive" },
  { to: "/settings", icon: "⚙", label: "Settings" },
];

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div
      style={{
        width: 220,
        minHeight: "100vh",
        background: "#0F1A2E",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "linear-gradient(135deg, #534AB7, #1D9E75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            🎙
          </div>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>MeetMind AI</span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "12px 10px" }}>
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              textDecoration: "none",
              background: isActive ? "rgba(83,74,183,0.25)" : "transparent",
              color: isActive ? "#AFA9EC" : "rgba(255,255,255,0.55)",
              fontSize: 13,
              fontWeight: isActive ? 500 : 400,
              marginBottom: 2,
              transition: "all 0.15s",
              boxSizing: "border-box",
            })}
          >
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: "16px 10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", marginBottom: 4 }}>
          <Avatar name="Admin User" size={28} />
          <div>
            <div style={{ color: "#fff", fontSize: 12, fontWeight: 500 }}>Admin User</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>admin@company.com</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.5)",
            fontSize: 12,
            textAlign: "left",
          }}
        >
          ← Sign out
        </button>
      </div>
    </div>
  );
}
