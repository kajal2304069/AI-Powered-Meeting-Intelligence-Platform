import { useState } from "react";
import Badge from "../components/common/Badge";
import { statusColor, statusBg } from "../styles/theme";
import { searchMeetings } from "../services/api";

// ─── AI Search Page ──────────────────────────────────────────────────────

export default function AISearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const doSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const r = await searchMeetings(query);
    setResults(r);
    setLoading(false);
  };

  const toggleVoice = () => {
    setListening(!listening);
    if (!listening) {
      setTimeout(() => {
        setQuery("AI features product roadmap");
        setListening(false);
      }, 2000);
    }
  };

  const features = [
    { icon: "🤖", title: "Task Auto Assignment", desc: "AI detects task owners automatically from transcript context" },
    { icon: "📅", title: "Deadline Prediction", desc: "AI suggests realistic deadlines based on task complexity" },
    { icon: "😊", title: "Sentiment Analysis", desc: "Positive · Neutral · Negative breakdown per meeting" },
    { icon: "📈", title: "Productivity Score", desc: "Per-employee scores based on task completion & meeting attendance" },
  ];

  return (
    <div style={{ padding: "32px 36px", maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 8px" }}>AI Search</h1>
      <p style={{ color: "#888780", fontSize: 13, margin: "0 0 28px" }}>Search across all meeting transcripts, summaries, and action items.</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doSearch()}
            placeholder="Search meetings, topics, decisions..."
            style={{ width: "100%", padding: "12px 16px", paddingRight: 44, borderRadius: 10, border: "0.5px solid #D3D1C7", fontSize: 14, outline: "none", boxSizing: "border-box" }}
            onFocus={(e) => (e.target.style.borderColor = "#534AB7")}
            onBlur={(e) => (e.target.style.borderColor = "#D3D1C7")}
          />
        </div>
        <button
          onClick={toggleVoice}
          style={{ padding: "12px 16px", borderRadius: 10, border: `1px solid ${listening ? "#D85A30" : "#D3D1C7"}`, background: listening ? "#FAECE7" : "#fff", cursor: "pointer", fontSize: 18 }}
          title="Voice search"
        >
          {listening ? "🔴" : "🎤"}
        </button>
        <button
          onClick={doSearch}
          style={{ padding: "12px 24px", borderRadius: 10, background: "#534AB7", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500 }}
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {listening && (
        <div style={{ background: "#FAECE7", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#993C1D" }}>
          🔴 Listening... speak your search query
        </div>
      )}

      {results.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, color: "#888780", marginBottom: 12 }}>
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </div>
          {results.map((m) => (
            <div key={m.id} style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 12, padding: 20, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#2C2C2A" }}>{m.title}</div>
                <Badge label={m.status} color={statusColor[m.status]} bg={statusBg[m.status]} />
              </div>
              <p style={{ fontSize: 12, color: "#888780", margin: "0 0 10px", lineHeight: 1.6 }}>{m.summary.slice(0, 120)}...</p>
              <div style={{ fontSize: 11, color: "#B4B2A9" }}>
                {m.date} · {m.duration}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Feature Cards */}
      <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>AI Capabilities</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {features.map((f) => (
          <div key={f.title} style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#2C2C2A", marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 12, color: "#888780", lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Sentiment sample */}
      <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 12, padding: 20, marginTop: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Meeting Sentiment Analysis — Q3 Roadmap Review</div>
        <div style={{ display: "flex", gap: 0, height: 12, borderRadius: 6, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ width: "62%", background: "#1D9E75" }} />
          <div style={{ width: "25%", background: "#D3D1C7" }} />
          <div style={{ width: "13%", background: "#D85A30" }} />
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 11 }}>
          <span style={{ color: "#1D9E75" }}>● Positive 62%</span>
          <span style={{ color: "#888780" }}>● Neutral 25%</span>
          <span style={{ color: "#D85A30" }}>● Negative 13%</span>
        </div>
      </div>
    </div>
  );
}
