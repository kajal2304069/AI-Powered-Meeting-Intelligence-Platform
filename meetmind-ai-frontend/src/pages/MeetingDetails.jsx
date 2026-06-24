import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Badge from "../components/common/Badge";
import { statusColor, statusBg, priorityColor, priorityBg } from "../styles/theme";
import { getMeetingById } from "../services/api";

// ─── Meeting Details Page ───────────────────────────────────────────────

export default function MeetingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("summary");

  const tabs = ["summary", "transcript", "action_items", "decisions", "questions"];
  const tabLabel = { summary: "Summary", transcript: "Transcript", action_items: "Action Items", decisions: "Key Decisions", questions: "Open Questions" };

  useEffect(() => {
    setLoading(true);
    getMeetingById(id).then((data) => {
      setMeeting(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div style={{ padding: "32px 36px" }}>Loading meeting…</div>;
  }

  if (!meeting) {
    return (
      <div style={{ padding: "32px 36px" }}>
        <p>Meeting not found.</p>
        <button onClick={() => navigate("/meetings")} style={{ fontSize: 13, color: "#534AB7", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          ← Back to Meetings
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 36px", maxWidth: 960 }}>
      <button
        onClick={() => navigate("/meetings")}
        style={{ fontSize: 13, color: "#534AB7", background: "none", border: "none", cursor: "pointer", marginBottom: 20, padding: 0 }}
      >
        ← Back to Meetings
      </button>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 8px" }}>{meeting.title}</h1>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontSize: 12, color: "#888780" }}>📅 {meeting.date}</span>
            <span style={{ fontSize: 12, color: "#888780" }}>⏱ {meeting.duration}</span>
            <span style={{ fontSize: 12, color: "#888780" }}>👥 {meeting.attendees.join(", ")}</span>
          </div>
        </div>
        <Badge label={meeting.status} color={statusColor[meeting.status]} bg={statusBg[meeting.status]} />
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "0.5px solid #E8E7E2", paddingBottom: 0 }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px 8px 0 0",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: tab === t ? 500 : 400,
              background: tab === t ? "#fff" : "transparent",
              color: tab === t ? "#534AB7" : "#888780",
              borderBottom: tab === t ? "2px solid #534AB7" : "2px solid transparent",
            }}
          >
            {tabLabel[t]}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 28 }}>
        {tab === "summary" && (
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 12 }}>Meeting Summary</h2>
            <p style={{ fontSize: 14, color: "#444441", lineHeight: 1.7, margin: "0 0 20px" }}>{meeting.summary}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#F7F6F4", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 11, color: "#888780", marginBottom: 8, fontWeight: 500 }}>ACTION ITEMS</div>
                <div style={{ fontSize: 24, fontWeight: 600, color: "#534AB7" }}>{meeting.action_items.length}</div>
              </div>
              <div style={{ background: "#F7F6F4", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 11, color: "#888780", marginBottom: 8, fontWeight: 500 }}>ATTENDEES</div>
                <div style={{ fontSize: 24, fontWeight: 600, color: "#1D9E75" }}>{meeting.attendees.length}</div>
              </div>
            </div>
          </div>
        )}

        {tab === "transcript" && (
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 16 }}>Full Transcript</h2>
            <div style={{ background: "#F7F6F4", borderRadius: 10, padding: 20, fontFamily: "monospace", fontSize: 13, color: "#444441", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
              {meeting.transcript}
            </div>
          </div>
        )}

        {tab === "action_items" && (
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 16 }}>Action Items</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {meeting.action_items.map((item, i) => (
                <div key={i} style={{ padding: 16, border: "0.5px solid #E8E7E2", borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#2C2C2A" }}>{item.task}</span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Badge label={item.priority} color={priorityColor[item.priority]} bg={priorityBg[item.priority]} />
                      <Badge label={item.status} color={statusColor[item.status]} bg={statusBg[item.status]} />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 16 }}>
                    <span style={{ fontSize: 12, color: "#888780" }}>👤 {item.owner}</span>
                    <span style={{ fontSize: 12, color: "#888780" }}>📅 {item.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "decisions" && (
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 16 }}>Key Decisions</h2>
            <div style={{ background: "#E1F5EE", borderRadius: 10, padding: 20 }}>
              <p style={{ fontSize: 14, color: "#085041", lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>{meeting.key_decisions}</p>
            </div>
          </div>
        )}

        {tab === "questions" && (
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 16 }}>Open Questions</h2>
            <div style={{ background: "#FAEEDA", borderRadius: 10, padding: 20 }}>
              <p style={{ fontSize: 14, color: "#633806", lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>{meeting.open_questions}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
