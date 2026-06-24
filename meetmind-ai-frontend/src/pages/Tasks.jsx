import { useState, useEffect } from "react";
import TaskTable from "../components/tasks/TaskTable";
import { getTasks, updateTaskStatus } from "../services/api";

// ─── Tasks Page ──────────────────────────────────────────────────────────

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const filters = ["All", "Pending", "In Progress", "Completed"];

  useEffect(() => {
    getTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const filtered = filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  const handleStatusChange = (filteredIndex, newStatus) => {
    const globalIdx = tasks.indexOf(filtered[filteredIndex]);
    const updated = [...tasks];
    updated[globalIdx] = { ...updated[globalIdx], status: newStatus };
    setTasks(updated);
    updateTaskStatus(globalIdx, newStatus);
  };

  if (loading) {
    return <div style={{ padding: "32px 36px" }}>Loading tasks…</div>;
  }

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1100 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Tasks</h1>
        <div style={{ display: "flex", gap: 6 }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: `0.5px solid ${filter === f ? "#534AB7" : "#D3D1C7"}`,
                background: filter === f ? "#EEEDFE" : "#fff",
                color: filter === f ? "#534AB7" : "#888780",
                fontSize: 12,
                cursor: "pointer",
                fontWeight: filter === f ? 500 : 400,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <TaskTable tasks={filtered} onStatusChange={handleStatusChange} />
    </div>
  );
}
