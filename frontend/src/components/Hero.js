import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero({ imageUrl }) {
  const nav = useNavigate();
  return (
    <section className="container">
      <div className="hero">
        <div className="heroInner">
          <div
            className="heroImg"
            style={{
              backgroundImage: `url(${imageUrl || "https://images.unsplash.com/photo-1520975958221-1a910bfecc02?w=1400"})`,
            }}
          />
          <div className="heroCopy">
            <h1 className="heroTitle">GUÍA DE REGALO</h1>
            <p className="heroSub">
              Explora categorías, revisa tallas y administra inventario con tu backend.
            </p>
            <button className="heroBtn" onClick={() => nav("/categoria/Hombre")}>
              Explorar guía
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
