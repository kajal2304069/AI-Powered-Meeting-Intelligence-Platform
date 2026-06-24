import { useState } from "react";
import Badge from "../common/Badge";
import Avatar from "../common/Avatar";
import { statusColor, statusBg } from "../../styles/theme";

// ─── MeetingCard ─────────────────────────────────────────────────────────
// One card in the meetings grid. Clicking it navigates to the meeting's
// detail page (handled by the parent via onClick).

export default function MeetingCard({ meeting, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `0.5px solid ${hovered ? "#AFA9EC" : "#E8E7E2"}`,
        borderRadius: 14,
        padding: 24,
        cursor: "pointer",
        transition: "all 0.15s",
        boxShadow: hovered ? "0 4px 16px rgba(83,74,183,0.08)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#2C2C2A", flex: 1, paddingRight: 12 }}>{meeting.title}</div>
        <Badge label={meeting.status} color={statusColor[meeting.status]} bg={statusBg[meeting.status]} />
      </div>
      <p style={{ fontSize: 12, color: "#888780", margin: "0 0 14px", lineHeight: 1.5 }}>
        {meeting.summary.slice(0, 100)}...
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 11, color: "#888780" }}>📅 {meeting.date}</span>
        <span style={{ fontSize: 11, color: "#888780" }}>⏱ {meeting.duration}</span>
        <div style={{ display: "flex", gap: -4, marginLeft: "auto" }}>
          {meeting.attendees.slice(0, 3).map((a, i) => (
            <Avatar key={i} name={a} size={22} />
          ))}
        </div>
      </div>
    </div>
  );
}
