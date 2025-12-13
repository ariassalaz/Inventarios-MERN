import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles = [] }) {
  const user = useSelector((s) => s.auth.user);

  if (!user) return <Navigate to="/login" replace />;

  const rol = user?.rol || user?.role;
  if (roles.length > 0 && !roles.includes(rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
