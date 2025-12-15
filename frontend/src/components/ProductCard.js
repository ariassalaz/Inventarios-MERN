import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const p = props.producto || props.product || props.p;

  if (!p) return null;

  const id = p._id || p.id;
  if (!id) return null;

  const img =
    (Array.isArray(p.imagenes) && p.imagenes.length > 0 ? p.imagenes[0] : "") ||
    p.imagen ||
    "";

  const precio = Number(p.precio || 0);

  return (
    <article className="productCard">
      <Link to={`/producto/${id}`} className="productMedia">
        {img ? (
          <img src={img} alt={p.nombre || "Producto"} />
        ) : (
          <div className="productNoImg">Sin imagen</div>
        )}
      </Link>

      <div className="productBody">
        <div className="productName">{p.nombre}</div>
        <div className="productPrice">
          ${precio.toLocaleString("es-MX")}
          {precio ? ".00" : ""}
        </div>
      </div>
    </article>
  );
}