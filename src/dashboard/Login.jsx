import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./dashboard.css";

/*
  Create the dashboard user(s) once in Supabase Studio:
  Authentication > Users > Add user (set an email + password there).
  This page does not let anyone sign themselves up, on purpose.
*/
export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError("Wrong email or password.");
      return;
    }
    navigate("/dashboard");
  }

  return (
    <div className="db-login">
      <form className="db-login-card" onSubmit={submit}>
        <h1>Dashboard login</h1>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <div className="db-error">{error}</div>}
        <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
      </form>
    </div>
  );
}
