import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  // No ha iniciado sesión
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // No es administrador
  if (user.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Sí es admin
  return children;
}
