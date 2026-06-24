import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Meetings from "../pages/Meetings";
import MeetingDetails from "../pages/MeetingDetails";
import Tasks from "../pages/Tasks";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import AISearch from "../pages/AISearch";
import ExecutiveDashboard from "../pages/ExecutiveDashboard";

// ─── App Routes ──────────────────────────────────────────────────────────
// /login is public. Everything else lives behind DashboardLayout (sidebar +
// outlet) and redirects to /login if the user isn't authenticated.

export default function AppRoutes({ isLoggedIn, onLogin, onLogout }) {
  return (
    <Routes>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={onLogin} />}
      />

      <Route
        element={isLoggedIn ? <DashboardLayout onLogout={onLogout} /> : <Navigate to="/login" replace />}
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/meetings/:id" element={<MeetingDetails />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/search" element={<AISearch />} />
        <Route path="/executive" element={<ExecutiveDashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
}
