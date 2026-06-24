// ─── AnalyticsCard ───────────────────────────────────────────────────────
// Reusable KPI/stat card. Used in the Dashboard stat row and the Executive
// Dashboard KPI row.

export default function AnalyticsCard({ label, value, icon, color, bg, change, up }) {
  return (
    <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: "20px 20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: "#888780", fontWeight: 500 }}>{label}</span>
        {icon && (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: bg || "#F1EFE8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            {icon}
          </div>
        )}
      </div>
      <div style={{ fontSize: 30, fontWeight: 600, color: color || "#2C2C2A" }}>{value}</div>
      {change && (
        <div style={{ fontSize: 12, color: up ? "#1D9E75" : "#D85A30", marginTop: 6 }}>{change} vs last month</div>
      )}
    </div>
  );
}
