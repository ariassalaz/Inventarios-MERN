import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../features/products/productsSlice";

function norm(str) {
  return String(str || "").trim().toLowerCase();
}

export default function Category() {
  const { categoria } = useParams(); // /categoria/:categoria
  const location = useLocation();
  const dispatch = useDispatch();

  const { items = [], status, error } = useSelector((s) => s.products);

  const q = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    return (sp.get("q") || "").trim();
  }, [location.search]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const categoriaNorm = norm(categoria);

  const filtered = useMemo(() => {
    let list = Array.isArray(items) ? items : [];

    // categoría
    if (categoriaNorm && !["todo", "explorar"].includes(categoriaNorm)) {
      list = list.filter((p) => norm(p.categoria) === categoriaNorm);
    }

    // búsqueda
    if (q) {
      const qn = norm(q);
      list = list.filter((p) => {
        const nombre = norm(p.nombre);
        const desc = norm(p.descripcion);
        const cat = norm(p.categoria);
        return nombre.includes(qn) || desc.includes(qn) || cat.includes(qn);
      });
    }

    return list;
  }, [items, categoriaNorm, q]);

  const titulo = useMemo(() => {
    if (q && ["todo", "explorar"].includes(categoriaNorm)) return `Resultados: "${q}"`;
    if (q) return `${categoria} · "${q}"`;
    return categoria || "Tienda";
  }, [categoria, categoriaNorm, q]);

  if (status === "loading") {
    return <div className="container" style={{ padding: 20 }}>Cargando...</div>;
  }

  if (status === "failed") {
    return (
      <div className="container" style={{ padding: 20 }}>
        Error: {error || "No se pudieron cargar productos"}
      </div>
    );
  }

  return (
    <section className="container" style={{ paddingTop: 18, paddingBottom: 30 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ margin: 0 }}>{titulo}</h2>
        <div className="muted">{filtered.length} producto(s)</div>
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ marginTop: 16, padding: 16 }}>
          No hay productos para mostrar.
        </div>
      ) : (
        <div className="productsGrid" style={{ marginTop: 16 }}>
          {filtered.map((p) => (
            <ProductCard key={p._id} producto={p} />
          ))}
        </div>
      )}
    </section>
  );
}
