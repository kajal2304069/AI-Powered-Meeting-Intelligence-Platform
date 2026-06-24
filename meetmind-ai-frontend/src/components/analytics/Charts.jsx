import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// ─── Charts ──────────────────────────────────────────────────────────────
// All recharts visualizations used across the app, grouped here so the
// Analytics page (and the Dashboard's productivity/task-overview cards)
// can reuse them without duplicating chart config.

export function TaskStatusPie({ data, height = 200, showLabel = false }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={showLabel ? 0 : 50}
          outerRadius={80}
          paddingAngle={showLabel ? 0 : 3}
          dataKey="value"
          label={showLabel ? ({ value }) => `${value}` : undefined}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function MeetingsPerMonthChart({ data, height = 220 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE8" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#888780" }} />
        <YAxis tick={{ fontSize: 11, fill: "#888780" }} />
        <Tooltip />
        <Bar dataKey="meetings" fill="#534AB7" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ProductivityBarChart({ data, height = 220, layout = "vertical", showLabel = false }) {
  if (layout === "horizontal-bars") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE8" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#888780" }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#888780" }} width={42} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar dataKey="score" fill="#1D9E75" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 0, right: 8, left: -24, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE8" />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#888780" }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#888780" }} />
        <Tooltip formatter={(v) => `${v}%`} />
        <Bar
          dataKey="score"
          radius={[4, 4, 0, 0]}
          label={showLabel ? { position: "top", fontSize: 10, fill: "#888780", formatter: (v) => `${v}%` } : undefined}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.score >= 90 ? "#1D9E75" : entry.score >= 85 ? "#534AB7" : "#D85A30"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DeadlineComplianceChart({ data, height = 200 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE8" />
        <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#888780" }} />
        <YAxis tick={{ fontSize: 11, fill: "#888780" }} />
        <Tooltip />
        <Bar dataKey="onTime" fill="#1D9E75" radius={[4, 4, 0, 0]} stackId="a" />
        <Bar dataKey="late" fill="#D85A30" radius={[4, 4, 0, 0]} stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
}
