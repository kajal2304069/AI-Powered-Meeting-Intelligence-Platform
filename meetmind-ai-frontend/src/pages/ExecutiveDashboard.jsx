import { useState, useEffect } from "react";
import AnalyticsCard from "../components/analytics/AnalyticsCard";
import { TaskStatusPie, ProductivityBarChart } from "../components/analytics/Charts";
import { getExecutiveInsights, getAnalytics } from "../services/api";

// ─── Executive Dashboard Page ────────────────────────────────────────────

const insightBg = { insight: "#EEEDFE", warning: "#FAEEDA", trend: "#E1F5EE", action: "#E6F1FB" };
const insightColor = { insight: "#534AB7", warning: "#BA7517", trend: "#0F6E56", action: "#185FA5" };

export default function ExecutiveDashboard() {
  const [kpis, setKpis] = useState([]);
  const [insights, setInsights] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    getExecutiveInsights().then((data) => {
      setKpis(data.kpis);
      setInsights(data.insights);
    });
    getAnalytics().then(setAnalytics);
  }, []);

  if (!analytics) {
    return <div style={{ padding: "32px 36px" }}>Loading executive dashboard…</div>;
  }

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1100 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Executive Dashboard</h1>
        <p style={{ color: "#888780", fontSize: 13, margin: 0 }}>High-level view for managers and leadership.</p>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {kpis.map((k) => (
          <AnalyticsCard key={k.label} label={k.label} value={k.value} icon={k.icon} change={k.change} up={k.up} />
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 20px" }}>Team Productivity Scores</h2>
          <ProductivityBarChart data={analytics.productivity} height={200} showLabel />
        </div>

        <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 8px" }}>Task Overview</h2>
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            {analytics.taskStatus.map((s) => (
              <span key={s.name} style={{ fontSize: 11, color: "#888780", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color, display: "inline-block" }} />
                {s.name}
              </span>
            ))}
          </div>
          <TaskStatusPie data={analytics.taskStatus} height={200} showLabel />
        </div>
      </div>

      {/* AI Insights */}
      <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 24 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 16px" }}>AI Insights</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {insights.map((ins, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", background: insightBg[ins.type], borderRadius: 10 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{ins.icon}</span>
              <span style={{ fontSize: 13, color: insightColor[ins.type], lineHeight: 1.6 }}>{ins.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
