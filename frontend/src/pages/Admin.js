import React from "react";

export default function Admin() {
  return (
    <section className="container" style={{ padding: "22px 0 60px" }}>
      <div className="card" style={{ padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Panel Admin</h2>
        <p className="muted">
          Aquí conectamos CRUD de productos, ventas y reportes (CSV).  
          Ya tienes rutas: /api/productos (POST/PUT/DELETE con token), /api/ventas, /api/reportes.
        </p>
      </div>
    </section>
  );
}
