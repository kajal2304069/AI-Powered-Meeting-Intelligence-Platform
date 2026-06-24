import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MeetingTable from "../components/meetings/MeetingTable";
import TaskCard from "../components/tasks/TaskCard";
import { getMeetings, getTasks } from "../services/api";

// ─── Dashboard Page ──────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMeetings(), getTasks()]).then(([m, t]) => {
      setMeetings(m);
      setTasks(t);
      setLoading(false);
    });
  }, []);

  const stats = [
    { label: "Total Meetings", value: meetings.length, icon: "🎙", color: "#534AB7", bg: "#EEEDFE" },
    { label: "Pending Tasks", value: tasks.filter((t) => t.status === "Pending").length, icon: "⏳", color: "#BA7517", bg: "#FAEEDA" },
    { label: "Completed Tasks", value: tasks.filter((t) => t.status === "Completed").length, icon: "✅", color: "#1D9E75", bg: "#E1F5EE" },
    { label: "Upcoming Deadlines", value: tasks.filter((t) => t.status !== "Completed").length, icon: "📅", color: "#D85A30", bg: "#FAECE7" },
  ];

  const upcomingDeadlines = tasks.filter((t) => t.status === "Pending" || t.status === "In Progress").slice(0, 4);

  if (loading) {
    return <div style={{ padding: "32px 36px" }}>Loading dashboard…</div>;
  }

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1100 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px", color: "#0F1A2E" }}>Good morning, Admin 👋</h1>
          <p style={{ color: "#888780", fontSize: 13, margin: 0 }}>Here's what's happening with your meetings today.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => navigate("/meetings")}
            style={{ padding: "9px 18px", borderRadius: 8, border: "1px solid #534AB7", background: "#EEEDFE", color: "#534AB7", fontSize: 13, fontWeight: 500, cursor: "pointer" }}
          >
            + New Meeting
          </button>
          <button style={{ padding: "9px 18px", borderRadius: 8, border: "1px solid #D3D1C7", background: "#fff", color: "#444441", fontSize: 13, cursor: "pointer" }}>
            ↑ Upload Recording
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: "20px 20px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: "#888780", fontWeight: 500 }}>{s.label}</span>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{s.icon}</div>
            </div>
            <div style={{ fontSize: 30, fontWeight: 600, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Recent meetings */}
      <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Recent Meetings</h2>
          <button onClick={() => navigate("/meetings")} style={{ fontSize: 12, color: "#534AB7", background: "none", border: "none", cursor: "pointer" }}>
            View all →
          </button>
        </div>
        <MeetingTable meetings={meetings.slice(0, 4)} onSelect={(m) => navigate(`/meetings/${m.id}`)} />
      </div>

      {/* Upcoming deadlines */}
      <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>Upcoming Deadlines</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {upcomingDeadlines.map((t, i) => (
            <TaskCard key={i} task={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
