import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, loginWithGoogle } from "../services/api";

// ─── Login Page ──────────────────────────────────────────────────────────

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
    onLogin();
    navigate("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await loginWithGoogle();
    setLoading(false);
    onLogin();
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0F1A2E 0%, #1a2744 50%, #0d2137 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(83,74,183,0.18) 0%, transparent 70%)", top: -100, left: -100, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,158,117,0.12) 0%, transparent 70%)", bottom: -80, right: -80, pointerEvents: "none" }} />

      {/* Glassmorphism card */}
      <div
        style={{
          width: 420,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 24,
          padding: "48px 40px",
          boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
          animation: "fadeSlideUp 0.5s ease",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #534AB7, #1D9E75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: 24,
            }}
          >
            🎙
          </div>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>MeetMind AI</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0 }}>Intelligent meeting assistant</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 12, marginBottom: 6, letterSpacing: "0.05em" }}>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 10,
                fontSize: 14,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(83,74,183,0.8)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 12, marginBottom: 6, letterSpacing: "0.05em" }}>PASSWORD</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  padding: "12px 42px 12px 14px",
                  borderRadius: 10,
                  fontSize: 14,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(83,74,183,0.8)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 16,
                  padding: 0,
                }}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ width: 15, height: 15, accentColor: "#534AB7" }}
              />
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Remember me</span>
            </label>
            <span style={{ color: "#7F77DD", fontSize: 13, cursor: "pointer" }}>Forgot password?</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              background: loading ? "rgba(83,74,183,0.5)" : "linear-gradient(135deg, #534AB7, #7F77DD)",
              color: "#fff",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              letterSpacing: "0.02em",
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
        </form>
      </div>
      <style>{`@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
