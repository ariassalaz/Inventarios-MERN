import React, { useMemo, useState } from 'react';
import { useGetProductosQuery } from '../features/products/productosApiSlice';
import { useCrearVentaMutation, useGetVentasQuery } from '../features/ventas/ventasApiSlice';

export default function Ventas() {
  const { data: productos = [] } = useGetProductosQuery();
  const { data: ventas = [], isLoading } = useGetVentasQuery();
  const [crearVenta, { isLoading: creando }] = useCrearVentaMutation();

  const [productoId, setProductoId] = useState('');
  const [talla, setTalla] = useState('M');
  const [cantidad, setCantidad] = useState(1);
  const [carrito, setCarrito] = useState([]);
  const [err, setErr] = useState('');

  const productoSel = useMemo(() => productos.find((p) => p._id === productoId), [productos, productoId]);

  const agregar = () => {
    setErr('');
    if (!productoId) return setErr('Selecciona un producto');
    if (!talla) return setErr('Selecciona una talla');
    if (!cantidad || Number(cantidad) <= 0) return setErr('Cantidad inválida');

    setCarrito((prev) => [
      ...prev,
      { producto: productoId, talla, cantidad: Number(cantidad), nombre: productoSel?.nombre || '' },
    ]);
  };

  const quitar = (i) => setCarrito((prev) => prev.filter((_, idx) => idx !== i));

  const confirmar = async () => {
    setErr('');
    if (carrito.length === 0) return setErr('Agrega al menos un item');

    try {
      await crearVenta({ items: carrito.map(({ producto, talla, cantidad }) => ({ producto, talla, cantidad })) }).unwrap();
      setCarrito([]);
      setProductoId('');
      setTalla('M');
      setCantidad(1);
    } catch (e) {
      setErr(e?.data?.message || e?.data?.mensaje || 'Error al crear venta');
    }
  };

  return (
    <div className="grid grid-2">
      <div className="card">
        <h1 className="h1">Registro de ventas</h1>

        <label className="label">Producto</label>
        <select className="select" value={productoId} onChange={(e) => setProductoId(e.target.value)}>
          <option value="">-- Selecciona --</option>
          {productos.map((p) => (
            <option key={p._id} value={p._id}>{p.nombre}</option>
          ))}
        </select>

        <label className="label">Talla</label>
        <select className="select" value={talla} onChange={(e) => setTalla(e.target.value)}>
          {(productoSel?.tallas || []).map((t) => (
            <option key={t.talla} value={t.talla}>
              {t.talla} (stock: {t.stock})
            </option>
          ))}
          {(productoSel?.tallas || []).length === 0 && (
            <>
              <option value="XXS">XXS</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </>
          )}
        </select>

        <label className="label">Cantidad</label>
        <input className="input" type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />

        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn" onClick={agregar}>Agregar</button>
          <button className="btn btn-ok" onClick={confirmar} disabled={creando}>
            Confirmar venta
          </button>
        </div>

        {err && <div className="err" style={{ marginTop: 10 }}>{err}</div>}

        <div style={{ marginTop: 14 }}>
          <div className="h2">Carrito</div>
          {carrito.length === 0 ? (
            <div className="muted">Vacío</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Talla</th>
                  <th>Cant.</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((c, i) => (
                  <tr key={i}>
                    <td>{c.nombre || c.producto}</td>
                    <td>{c.talla}</td>
                    <td>{c.cantidad}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => quitar(i)}>Quitar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="card">
        <h1 className="h1">Mis ventas</h1>
        {isLoading && <div className="muted">Cargando...</div>}

        {!isLoading && (
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Total</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v._id}>
                  <td className="muted">{new Date(v.createdAt).toLocaleString()}</td>
                  <td>${v.total}</td>
                  <td className="muted">{(v.items || []).length}</td>
                </tr>
              ))}
              {ventas.length === 0 && (
                <tr>
                  <td colSpan="3" className="muted">Sin ventas todavía</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
