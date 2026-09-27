import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./dashboard.css";

export default function DashboardLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await signOut();
    navigate("/dashboard/login");
  }

  return (
    <div className="db-shell">
      <header className="db-header">
        <div className="db-brand">Orders dashboard</div>
        <nav className="db-nav">
          <Link to="/dashboard">Orders</Link>
        </nav>
        <div className="db-user">
          <span>{user?.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <main className="db-main">
        <Outlet />
      </main>
    </div>
  );
}
