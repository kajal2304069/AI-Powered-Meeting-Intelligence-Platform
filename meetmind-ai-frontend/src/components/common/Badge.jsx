// ─── Badge ───────────────────────────────────────────────────────────────
// Small colored label used for status/priority tags throughout the app.

export default function Badge({ label, color, bg }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 500,
        background: bg,
        color,
      }}
    >
      {label}
    </span>
  );
}
