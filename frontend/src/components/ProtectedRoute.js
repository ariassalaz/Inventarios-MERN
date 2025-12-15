import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles = [] }) {
  const user = useSelector((s) => s.auth.user);

  //SI NO HAY USUARIO REDIRIGIR A LOGIN
  if (!user) return <Navigate to="/login" replace />;

  //VERIFICAR ROL
  const rol = user?.rol || user?.role;
  if (roles.length > 0 && !roles.includes(rol)) {
    return <Navigate to="/" replace />;
  }

  //USUARIO AUTORIZADO
  return children;
}