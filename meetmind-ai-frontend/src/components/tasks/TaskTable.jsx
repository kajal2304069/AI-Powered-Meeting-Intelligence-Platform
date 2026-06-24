import Badge from "../common/Badge";
import Avatar from "../common/Avatar";
import { priorityColor, priorityBg, statusColor, statusBg } from "../../styles/theme";

// ─── TaskTable ───────────────────────────────────────────────────────────
// Full sortable/filterable task table used on the Tasks page. Status is
// editable inline via the dropdown in the last column.

export default function TaskTable({ tasks, onStatusChange }) {
  return (
    <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <thead>
          <tr style={{ background: "#F7F6F4" }}>
            {["Task", "Meeting", "Owner", "Deadline", "Priority", "Status"].map((h) => (
              <th key={h} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 500, color: "#888780", textAlign: "left", letterSpacing: "0.04em" }}>
                {h.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, i) => (
            <tr
              key={i}
              style={{ borderTop: "0.5px solid #F1EFE8" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAF8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <td style={{ padding: "14px 16px", fontSize: 13, color: "#2C2C2A", fontWeight: 500 }}>{t.task}</td>
              <td style={{ padding: "14px 16px", fontSize: 12, color: "#888780" }}>
                {t.meeting?.slice(0, 28)}
                {t.meeting?.length > 28 ? "…" : ""}
              </td>
              <td style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar name={t.owner} size={24} />
                  <span style={{ fontSize: 12, color: "#444441" }}>{t.owner}</span>
                </div>
              </td>
              <td style={{ padding: "14px 16px", fontSize: 12, color: "#888780" }}>{t.deadline}</td>
              <td style={{ padding: "14px 16px" }}>
                <Badge label={t.priority} color={priorityColor[t.priority]} bg={priorityBg[t.priority]} />
              </td>
              <td style={{ padding: "14px 16px" }}>
                <select
                  value={t.status}
                  onChange={(e) => onStatusChange(i, e.target.value)}
                  style={{
                    padding: "4px 8px",
                    borderRadius: 6,
                    border: `0.5px solid ${statusColor[t.status]}`,
                    background: statusBg[t.status],
                    color: statusColor[t.status],
                    fontSize: 11,
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
