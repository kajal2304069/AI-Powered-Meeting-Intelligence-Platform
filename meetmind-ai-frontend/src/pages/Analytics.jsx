import { useState, useEffect } from "react";
import { TaskStatusPie, MeetingsPerMonthChart, ProductivityBarChart, DeadlineComplianceChart } from "../components/analytics/Charts";
import { getAnalytics } from "../services/api";

// ─── Analytics Page ──────────────────────────────────────────────────────

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAnalytics().then(setData);
  }, []);

  if (!data) {
    return <div style={{ padding: "32px 36px" }}>Loading analytics…</div>;
  }

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1100 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 28px" }}>Analytics</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Task Status Pie */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 20px" }}>Completed vs Pending Tasks</h2>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            {data.taskStatus.map((s) => (
              <span key={s.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#888780" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, display: "inline-block" }} />
                {s.name} ({s.value})
              </span>
            ))}
          </div>
          <TaskStatusPie data={data.taskStatus} />
        </div>

        {/* Meetings per month */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 20px" }}>Meetings This Month</h2>
          <MeetingsPerMonthChart data={data.meetingsPerMonth} />
        </div>

        {/* Employee Productivity */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 20px" }}>Employee Productivity</h2>
          <ProductivityBarChart data={data.productivity} layout="horizontal-bars" />
        </div>

        {/* Deadline Compliance */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 8px" }}>Deadline Compliance</h2>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#888780" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "#1D9E75", display: "inline-block" }} />
              On Time
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#888780" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "#D85A30", display: "inline-block" }} />
              Late
            </span>
          </div>
          <DeadlineComplianceChart data={data.deadlineCompliance} />
        </div>
      </div>
    </div>
  );
}
