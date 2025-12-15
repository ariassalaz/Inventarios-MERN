import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setQty,
  removeFromCart,
  clearCart,
  checkoutCart,
} from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();

  // si tu slice NO tiene status/error, quítalos (pero normalmente sí)
  const items = useSelector((s) => s.cart.items);
  const status = useSelector((s) => s.cart.status);
  const error = useSelector((s) => s.cart.error);

  const total = items.reduce(
    (acc, it) => acc + Number(it.precio || 0) * Number(it.cantidad || 0),
    0
  );

  const totalItems = items.reduce((a, x) => a + Number(x.cantidad || 0), 0);

  const onCheckout = async () => {
    try {
      await dispatch(checkoutCart()).unwrap();
    } catch (_) {}
  };

  if (!items.length) {
    return (
      <section className="container" style={{ padding: 20 }}>
        <h2>Tu carrito está vacío</h2>
        <p className="muted">Agrega productos desde la tienda.</p>
      </section>
    );
  }

  return (
    <section className="container" style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h2>Carrito</h2>
        <button className="ghostBtn" onClick={() => dispatch(clearCart())} disabled={status === "loading"}>
          Vaciar carrito
        </button>
      </div>

      {error && (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 12, border: "1px solid rgba(220, 20, 60, .25)", background: "rgba(220, 20, 60, .08)", color: "crimson" }}>
          {String(error)}
        </div>
      )}

      <div className="cartGrid" style={{ marginTop: 14 }}>
        <div className="cartList">
          {items.map((it) => {
            const maxStock = Number(it.stock ?? 999999);

            return (
              <div key={`${it.productoId}-${it.talla}`} className="cartItem">
                <img className="cartImg" src={it.imagen} alt={it.nombre} />

                <div className="cartInfo">
                  <div style={{ fontWeight: 800 }}>{it.nombre}</div>
                  <div className="muted">
                    Talla: <b>{it.talla}</b> · Stock: <b>{Number(it.stock ?? 0)}</b>
                  </div>
                  <div style={{ fontWeight: 800 }}>
                    ${Number(it.precio || 0).toLocaleString("es-MX")}.00
                  </div>
                </div>

                <div className="cartActions">
                  <input
                    type="number"
                    min="1"
                    max={maxStock}
                    value={it.cantidad}
                    disabled={status === "loading"}
                    onChange={(e) => {
                      const val = Number(e.target.value || 1);
                      dispatch(
                        setQty({
                          productoId: it.productoId,
                          talla: it.talla,
                          cantidad: Math.max(1, Math.min(val, maxStock)),
                        })
                      );
                    }}
                    style={{ width: 90, padding: 10, borderRadius: 12, border: "1px solid var(--line)" }}
                  />

                  <button
                    className="dangerBtn"
                    disabled={status === "loading"}
                    onClick={() => dispatch(removeFromCart({ productoId: it.productoId, talla: it.talla }))}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="cartSummary card">
          <h3>Resumen</h3>
          <div className="muted" style={{ marginTop: 6 }}>
            Productos: <b>{totalItems}</b>
          </div>

          <div style={{ marginTop: 12, fontSize: 22, fontWeight: 900 }}>
            Total: ${Number(total).toLocaleString("es-MX")}.00
          </div>

          <button
            className="primaryBtn"
            style={{ marginTop: 12, width: "100%" }}
            onClick={onCheckout}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Procesando..." : "Comprar"}
          </button>
        </aside>
      </div>
    </section>
  );
}
