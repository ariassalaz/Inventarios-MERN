import React from 'react';
import { useGetProductosQuery } from '../features/products/productosApiSlice';
import { useGetVentasQuery } from '../features/ventas/ventasApiSlice';
import { useResumenVentasQuery, useResumenInventarioQuery } from '../features/reportes/reportesApiSlice';

export default function Dashboard() {
  const { data: productos = [] } = useGetProductosQuery();
  const { data: ventas = [] } = useGetVentasQuery();
  const { data: rv } = useResumenVentasQuery();
  const { data: ri } = useResumenInventarioQuery();

  return (
    <div className="grid">
      <div className="card">
        <h1 className="h1">Dashboard</h1>
        <p className="muted">Resumen rápido del sistema.</p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="h2">Productos activos</div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>{productos.length}</div>
        </div>

        <div className="card">
          <div className="h2">Ventas registradas</div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>{ventas.length}</div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="h2">Reporte ventas (resumen)</div>
          <pre className="muted" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {rv ? JSON.stringify(rv, null, 2) : 'Cargando...'}
          </pre>
        </div>
        <div className="card">
          <div className="h2">Reporte inventario (resumen)</div>
          <pre className="muted" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {ri ? JSON.stringify(ri, null, 2) : 'Cargando...'}
          </pre>
        </div>
      </div>
    </div>
  );
}
