import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MeetingCard from "../components/meetings/MeetingCard";
import { getMeetings } from "../services/api";

// ─── Meetings Page ───────────────────────────────────────────────────────

export default function Meetings() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMeetings().then((data) => {
      setMeetings(data);
      setLoading(false);
    });
  }, []);

  const filtered = meetings.filter(
    (m) => m.title.toLowerCase().includes(search.toLowerCase()) || m.date.includes(search)
  );

  if (loading) {
    return <div style={{ padding: "32px 36px" }}>Loading meetings…</div>;
  }

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1100 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>All Meetings</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search meetings..."
          style={{ padding: "9px 14px", borderRadius: 8, border: "0.5px solid #D3D1C7", fontSize: 13, width: 220, outline: "none" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {filtered.map((m) => (
          <MeetingCard key={m.id} meeting={m} onClick={() => navigate(`/meetings/${m.id}`)} />
        ))}
      </div>
    </div>
  );
}
