import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQty, removeFromCart, clearCart } from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);

  const total = items.reduce((acc, it) => acc + Number(it.precio || 0) * Number(it.cantidad || 0), 0);

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
        <button className="ghostBtn" onClick={() => dispatch(clearCart())}>
          Vaciar carrito
        </button>
      </div>

      <div className="cartGrid" style={{ marginTop: 14 }}>
        <div className="cartList">
          {items.map((it) => (
            <div key={`${it.productoId}-${it.talla}`} className="cartItem">
              <img className="cartImg" src={it.imagen} alt={it.nombre} />

              <div className="cartInfo">
                <div style={{ fontWeight: 800 }}>{it.nombre}</div>
                <div className="muted">
                  Talla: <b>{it.talla}</b> · Stock: <b>{it.stock}</b>
                </div>
                <div style={{ fontWeight: 800 }}>
                  ${Number(it.precio).toLocaleString("es-MX")}.00
                </div>
              </div>

              <div className="cartActions">
                <input
                  type="number"
                  min="1"
                  max={it.stock}
                  value={it.cantidad}
                  onChange={(e) =>
                    dispatch(
                      updateQty({
                        productoId: it.productoId,
                        talla: it.talla,
                        cantidad: Math.max(1, Math.min(Number(e.target.value || 1), Number(it.stock || 1))),
                      })
                    )
                  }
                  style={{ width: 90, padding: 10, borderRadius: 12, border: "1px solid var(--line)" }}
                />

                <button
                  className="dangerBtn"
                  onClick={() => dispatch(removeFromCart({ productoId: it.productoId, talla: it.talla }))}
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cartSummary card">
          <h3>Resumen</h3>
          <div className="muted" style={{ marginTop: 6 }}>
            Productos: <b>{items.reduce((a, x) => a + Number(x.cantidad || 0), 0)}</b>
          </div>
          <div style={{ marginTop: 12, fontSize: 22, fontWeight: 900 }}>
            Total: ${Number(total).toLocaleString("es-MX")}.00
          </div>

          <button
            className="primaryBtn"
            style={{ marginTop: 12, width: "100%" }}
            onClick={() => alert("Listo: aquí conectarías /api/ventas")}
          >
            Comprar
          </button>
        </aside>
      </div>
    </section>
  );
}
