import { useState } from "react";
import Avatar from "../components/common/Avatar";

// ─── Settings Page ───────────────────────────────────────────────────────
// New page (not present in the original single-file prototype). Built to
// match the existing visual language: white cards, 14px radius, the same
// border/text color tokens used everywhere else.

export default function Settings() {
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@company.com");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySlack, setNotifySlack] = useState(false);
  const [autoTranscribe, setAutoTranscribe] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "0.5px solid #D3D1C7",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
  };

  const toggleRow = (label, desc, checked, onChange) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "0.5px solid #F1EFE8" }}>
      <div>
        <div style={{ fontSize: 13, color: "#2C2C2A", fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 12, color: "#888780" }}>{desc}</div>
      </div>
      <label style={{ position: "relative", display: "inline-block", width: 40, height: 22 }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span
          style={{
            position: "absolute",
            cursor: "pointer",
            inset: 0,
            background: checked ? "#534AB7" : "#D3D1C7",
            borderRadius: 22,
            transition: "0.2s",
          }}
          onClick={() => onChange(!checked)}
        >
          <span
            style={{
              position: "absolute",
              height: 16,
              width: 16,
              left: checked ? 21 : 3,
              bottom: 3,
              background: "#fff",
              borderRadius: "50%",
              transition: "0.2s",
            }}
          />
        </span>
      </label>
    </div>
  );

  return (
    <div style={{ padding: "32px 36px", maxWidth: 760 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Settings</h1>
      <p style={{ color: "#888780", fontSize: 13, margin: "0 0 28px" }}>Manage your profile and workspace preferences.</p>

      <form onSubmit={handleSave}>
        {/* Profile */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>Profile</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <Avatar name={name || "Admin User"} size={48} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#2C2C2A" }}>{name}</div>
              <div style={{ fontSize: 12, color: "#888780" }}>{email}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "#888780", marginBottom: 6 }}>Full name</label>
              <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "#888780", marginBottom: 6 }}>Email</label>
              <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px" }}>Notifications</h2>
          {toggleRow("Email notifications", "Get a summary after every meeting", notifyEmail, setNotifyEmail)}
          {toggleRow("Slack notifications", "Post meeting summaries to a Slack channel", notifySlack, setNotifySlack)}
        </div>

        {/* Meeting preferences */}
        <div style={{ background: "#fff", border: "0.5px solid #E8E7E2", borderRadius: 14, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px" }}>Meeting Preferences</h2>
          {toggleRow("Auto-transcribe", "Automatically transcribe and summarize new recordings", autoTranscribe, setAutoTranscribe)}
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 22px",
            borderRadius: 8,
            border: "none",
            background: "#534AB7",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {saved ? "Saved ✓" : "Save changes"}
        </button>
      </form>
    </div>
  );
}
