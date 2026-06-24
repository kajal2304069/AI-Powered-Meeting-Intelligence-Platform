import Badge from "../common/Badge";
import { priorityColor, priorityBg } from "../../styles/theme";

// ─── TaskCard ────────────────────────────────────────────────────────────
// Compact single-row task display, used in the Dashboard's
// "Upcoming Deadlines" panel.

export default function TaskCard({ task }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "0.5px solid #F1EFE8" }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: priorityColor[task.priority], flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: "#2C2C2A" }}>{task.task}</div>
        <div style={{ fontSize: 11, color: "#888780" }}>
          {task.owner} · {task.deadline}
        </div>
      </div>
      <Badge label={task.priority} color={priorityColor[task.priority]} bg={priorityBg[task.priority]} />
    </div>
  );
}
