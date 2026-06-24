import Badge from "../common/Badge";
import { statusColor, statusBg } from "../../styles/theme";

// ─── MeetingTable ────────────────────────────────────────────────────────
// Compact row-based list of meetings, used on the Dashboard's
// "Recent Meetings" panel.

export default function MeetingTable({ meetings, onSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {meetings.map((m) => (
        <div
          key={m.id}
          onClick={() => onSelect(m)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "12px 14px",
            borderRadius: 10,
            border: "0.5px solid #F1EFE8",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAF8")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "#EEEDFE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            🎙
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#2C2C2A", marginBottom: 2 }}>{m.title}</div>
            <div style={{ fontSize: 11, color: "#888780" }}>
              {m.date} · {m.duration}
            </div>
          </div>
          <Badge label={m.status} color={statusColor[m.status]} bg={statusBg[m.status]} />
        </div>
      ))}
    </div>
  );
}
