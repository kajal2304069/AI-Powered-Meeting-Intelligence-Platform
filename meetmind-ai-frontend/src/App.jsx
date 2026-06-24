import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

// ─── App ─────────────────────────────────────────────────────────────────
// Holds top-level auth state and wires up the router. All page/feature
// logic lives in src/pages and src/components — this file just wires
// the shell together.

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <AppRoutes
        isLoggedIn={loggedIn}
        onLogin={() => setLoggedIn(true)}
        onLogout={() => setLoggedIn(false)}
      />
    </BrowserRouter>
  );
}
