import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import AdminDashboard from "./pages/AdminDashboard";

import OwnerDashboard from "./pages/OwnerDashboard";

function App() {

  const token =
  localStorage.getItem("token");

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <Routes>

      {/* Login */}

      <Route

        path="/"

        element={

          token

          ? (

            user?.role === "ADMIN"

            ? (
              <Navigate to="/admin" />
            )

            : user?.role ===
              "STORE_OWNER"

            ? (
              <Navigate to="/owner" />
            )

            : (
              <Navigate to="/dashboard" />
            )

          )

          : (
            <Login />
          )

        }
      />

      {/* Register */}

      <Route
        path="/register"
        element={<Register />}
      />

      {/* User Dashboard */}

      <Route

        path="/dashboard"

        element={

          token

          ? (
            <Dashboard />
          )

          : (
            <Navigate to="/" />
          )

        }
      />

      {/* Admin Dashboard */}

      <Route

        path="/admin"

        element={

          token

          ? (
            <AdminDashboard />
          )

          : (
            <Navigate to="/" />
          )

        }
      />

      {/* Owner Dashboard */}

      <Route

        path="/owner"

        element={

          token

          ? (
            <OwnerDashboard />
          )

          : (
            <Navigate to="/" />
          )

        }
      />

    </Routes>

  );
}

export default App;