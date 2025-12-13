import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div>Inventarios-MERN · Frontend demo estilo tienda · {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
