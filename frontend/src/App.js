import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import ProductoForm from './pages/ProductoForm';
import Ventas from './pages/Ventas';
import Reportes from './pages/Reportes';

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/productos"
            element={
              <ProtectedRoute>
                <Productos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/productos/nuevo"
            element={
              <ProtectedRoute>
                <ProductoForm modo="crear" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/productos/:id/editar"
            element={
              <ProtectedRoute>
                <ProductoForm modo="editar" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ventas"
            element={
              <ProtectedRoute>
                <Ventas />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reportes"
            element={
              <ProtectedRoute>
                <Reportes />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div className="card">404</div>} />
        </Routes>
      </main>
    </div>
  );
}
