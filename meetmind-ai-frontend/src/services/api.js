// ─── API Service Layer ──────────────────────────────────────────────────────
// Centralizes all "backend" calls. Every function returns a Promise so that
// swapping these implementations for real fetch()/axios calls later requires
// no changes in any component — only this file.

import { MEETINGS, ALL_TASKS, ANALYTICS_DATA } from "./mockData";

const SIMULATED_DELAY = 500;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ── Auth ──────────────────────────────────────────────────────────────────
export async function login(email, password) {
  await wait(900);
  // Replace with a real request, e.g.:
  // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  // return res.json();
  return { token: "mock-token", email };
}

export async function loginWithGoogle() {
  await wait(700);
  return { token: "mock-token-google" };
}

export function logout() {
  // Clear any stored auth state here if you add real auth later.
  return Promise.resolve();
}

// ── Meetings ─────────────────────────────────────────────────────────────
export async function getMeetings() {
  await wait(SIMULATED_DELAY);
  return MEETINGS;
}

export async function getMeetingById(id) {
  await wait(SIMULATED_DELAY);
  return MEETINGS.find((m) => String(m.id) === String(id)) || null;
}

export async function searchMeetings(query) {
  await wait(600);
  const q = query.toLowerCase();
  return MEETINGS.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.summary.toLowerCase().includes(q) ||
      m.transcript.toLowerCase().includes(q)
  );
}

// ── Tasks ────────────────────────────────────────────────────────────────
export async function getTasks() {
  await wait(SIMULATED_DELAY);
  return ALL_TASKS;
}

export async function updateTaskStatus(taskIndex, newStatus) {
  await wait(300);
  // In a real API this would PATCH /api/tasks/:id
  return { taskIndex, status: newStatus };
}

// ── Analytics ────────────────────────────────────────────────────────────
export async function getAnalytics() {
  await wait(SIMULATED_DELAY);
  return ANALYTICS_DATA;
}

export async function getExecutiveInsights() {
  await wait(SIMULATED_DELAY);
  return {
    kpis: [
      { label: "Total Meetings", value: 24, change: "+12%", up: true, icon: "🎙" },
      { label: "Team Productivity", value: "87%", change: "+3%", up: true, icon: "📈" },
      { label: "Missed Deadlines", value: 3, change: "-2", up: true, icon: "⚠️" },
      { label: "AI Insights Generated", value: 42, change: "+18", up: true, icon: "🤖" },
    ],
    insights: [
      { type: "insight", icon: "💡", text: "Carol has the highest task completion rate (95%) this month. Consider recognizing her performance." },
      { type: "warning", icon: "⚠️", text: "3 high-priority tasks are overdue. Eve's auth refactor is blocking 3 other tickets." },
      { type: "trend", icon: "📈", text: "Meetings are up 26% from last month. Consider if all meetings are necessary." },
      { type: "action", icon: "✅", text: "Acme Corp onboarding is on track. SSO integration is the only remaining blocker." },
    ],
  };
}
