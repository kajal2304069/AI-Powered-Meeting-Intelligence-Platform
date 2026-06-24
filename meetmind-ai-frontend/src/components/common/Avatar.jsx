// ─── Avatar ──────────────────────────────────────────────────────────────
// Renders a colored circle with a person's initials. The color is derived
// deterministically from the first character of the name.

export default function Avatar({ name, size = 32 }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#534AB7", "#0F6E56", "#993C1D", "#185FA5", "#3B6D11", "#854F0B"];
  const bg = colors[name.charCodeAt(0) % colors.length];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.34,
        fontWeight: 500,
        color: "#fff",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}
