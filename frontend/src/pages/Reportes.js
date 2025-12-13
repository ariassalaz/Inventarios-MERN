import React from 'react';
import { useResumenVentasQuery, useResumenInventarioQuery } from '../features/reportes/reportesApiSlice';

export default function Reportes() {
  const { data: rv, isLoading: lv } = useResumenVentasQuery();
  const { data: ri, isLoading: li } = useResumenInventarioQuery();

  const descargar = (path) => {
    window.open(`/api/reportes/${path}`, '_blank');
  };

  return (
    <div className="grid grid-2">
      <div className="card">
        <h1 className="h1">Reportes</h1>
        <p className="muted">Resúmenes y exportación CSV (lo genera el backend).</p>

        <div className="row">
          <button className="btn" onClick={() => descargar('ventas/csv')}>CSV Ventas</button>
          <button className="btn" onClick={() => descargar('inventario/csv')}>CSV Inventario</button>
        </div>
      </div>

      <div className="card">
        <div className="h2">Ventas (resumen)</div>
        <pre className="muted" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {lv ? 'Cargando...' : JSON.stringify(rv, null, 2)}
        </pre>
      </div>

      <div className="card">
        <div className="h2">Inventario (resumen)</div>
        <pre className="muted" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {li ? 'Cargando...' : JSON.stringify(ri, null, 2)}
        </pre>
      </div>

      <div className="card">
        <div className="h2">Nota</div>
        <div className="muted">
          Si el CSV no descarga, revisa que tu backend esté enviando <code>Content-Type</code> correcto
          y que el endpoint exista exactamente como: <code>/api/reportes/ventas/csv</code>.
        </div>
      </div>
    </div>
  );
}
