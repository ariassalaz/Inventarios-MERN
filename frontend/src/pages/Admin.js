import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAdmin } from "../features/products/productsSlice";

export default function Admin() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProductsAdmin());
  }, [dispatch]);

  return (
    <section className="container" style={{ padding: "28px 0" }}>
      <div className="card" style={{ padding: 18 }}>
        <h2 style={{ margin: 0, marginBottom: 6 }}>Inventarios</h2>
        <div className="muted" style={{ marginBottom: 12 }}>
          Stock por producto y por talla (se actualiza al comprar).
        </div>

        {status === "loading" && <div>Cargando...</div>}
        {error && <div style={{ color: "crimson" }}>{String(error)}</div>}

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>Producto</th>
                <th style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>Categoría</th>
                <th style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>Precio</th>
                <th style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>Stock</th>
              </tr>
            </thead>

            <tbody>
              {(items || []).map((p) => {
                const tallas = Array.isArray(p.tallas) ? p.tallas : [];
                const total = tallas.reduce((acc, t) => acc + Number(t.stock || 0), 0);

                return (
                  <tr key={p._id}>
                    <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>
                      <div style={{ fontWeight: 700 }}>{p.nombre}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{p._id}</div>
                    </td>

                    <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>
                      {p.categoria}
                    </td>

                    <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>
                      ${Number(p.precio || 0).toLocaleString("es-MX")}.00
                    </td>

                    <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>
                        Total: {total}
                      </div>

                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {tallas.map((t) => (
                          <span
                            key={t.talla}
                            style={{
                              padding: "6px 10px",
                              borderRadius: 999,
                              border: "1px solid var(--line)",
                              background: "rgba(0,0,0,.03)",
                              fontSize: 12,
                            }}
                          >
                            {t.talla}: <b>{Number(t.stock || 0)}</b>
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {status === "succeeded" && (!items || items.length === 0) && (
            <div className="muted" style={{ padding: 12 }}>No hay productos.</div>
          )}
        </div>

        <div style={{ marginTop: 12 }}>
          <button className="primaryBtn" onClick={() => dispatch(fetchProductsAdmin())}>
            Refrescar
          </button>
        </div>
      </div>
    </section>
  );
}
