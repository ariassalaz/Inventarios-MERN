import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useGetProductosQuery,
  useEliminarProductoMutation,
} from '../features/products/productosApiSlice';

export default function Productos() {
  const { data: productos = [], isLoading, error } = useGetProductosQuery();
  const [eliminarProducto, { isLoading: borrando }] = useEliminarProductoMutation();
  const [q, setQ] = useState('');

  const filtrados = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return productos;
    return productos.filter((p) =>
      (p.nombre || '').toLowerCase().includes(s) ||
      (p.categoria || '').toLowerCase().includes(s)
    );
  }, [q, productos]);

  const borrar = async (id) => {
    if (!window.confirm('¿Desactivar producto?')) return;
    try {
      await eliminarProducto(id).unwrap();
    } catch (e) {
      alert(e?.data?.message || e?.data?.mensaje || 'Error al eliminar');
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <div className="row">
          <h1 className="h1" style={{ margin: 0 }}>Productos</h1>
          <div className="spacer" />
          <Link className="btn btn-primary" to="/productos/nuevo">Nuevo</Link>
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          <input
            className="input"
            placeholder="Buscar por nombre o categoría..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        {isLoading && <div className="muted">Cargando...</div>}
        {error && <div className="err">Error al cargar productos</div>}

        {!isLoading && !error && (
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock (total)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p) => {
                const totalStock = (p.tallas || []).reduce((acc, t) => acc + (t.stock || 0), 0);
                return (
                  <tr key={p._id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{p.nombre}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{p._id}</div>
                    </td>
                    <td>{p.categoria}</td>
                    <td>${p.precio}</td>
                    <td>{totalStock}</td>
                    <td>
                      <div className="row">
                        <Link className="btn" to={`/productos/${p._id}/editar`}>Editar</Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => borrar(p._id)}
                          disabled={borrando}
                        >
                          Desactivar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan="5" className="muted">Sin resultados</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
