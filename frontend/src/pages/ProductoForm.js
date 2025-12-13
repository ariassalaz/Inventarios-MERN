import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCrearProductoMutation,
  useActualizarProductoMutation,
  useGetProductoQuery,
} from '../features/products/productosApiSlice';

const tallasDefault = ['XXS','XS','S','M','L','XL','XXL'];

export default function ProductoForm({ modo }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: producto } = useGetProductoQuery(id, { skip: modo !== 'editar' });

  const [crearProducto, { isLoading: creando }] = useCrearProductoMutation();
  const [actualizarProducto, { isLoading: editando }] = useActualizarProductoMutation();

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Hombre');
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [imagenesTxt, setImagenesTxt] = useState('');
  const [tallas, setTallas] = useState(tallasDefault.map((t) => ({ talla: t, stock: 0 })));
  const [err, setErr] = useState('');

  useEffect(() => {
    if (modo === 'editar' && producto) {
      setNombre(producto.nombre || '');
      setCategoria(producto.categoria || 'Hombre');
      setPrecio(producto.precio || 0);
      setDescripcion(producto.descripcion || '');
      setImagenesTxt((producto.imagenes || []).join('\n'));

      const map = new Map((producto.tallas || []).map((x) => [x.talla, x.stock]));
      setTallas(tallasDefault.map((t) => ({ talla: t, stock: Number(map.get(t) || 0) })));
    }
  }, [modo, producto]);

  const imagenes = useMemo(() => {
    return imagenesTxt
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  }, [imagenesTxt]);

  const onStock = (talla, stock) => {
    setTallas((prev) => prev.map((x) => (x.talla === talla ? { ...x, stock } : x)));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      const payload = {
        nombre,
        categoria,
        precio: Number(precio),
        descripcion,
        imagenes,
        tallas: tallas.map((t) => ({ talla: t.talla, stock: Number(t.stock) })),
      };

      if (!payload.nombre || !payload.categoria || !payload.precio) {
        throw new Error('Nombre, categoría y precio son obligatorios');
      }

      if (modo === 'crear') {
        await crearProducto(payload).unwrap();
      } else {
        await actualizarProducto({ id, data: payload }).unwrap();
      }

      navigate('/productos');
    } catch (e2) {
      setErr(e2?.data?.message || e2?.data?.mensaje || e2.message || 'Error');
    }
  };

  return (
    <div className="grid grid-2">
      <div className="card">
        <h1 className="h1">{modo === 'crear' ? 'Nuevo producto' : 'Editar producto'}</h1>

        <form onSubmit={onSubmit}>
          <label className="label">Nombre</label>
          <input className="input" value={nombre} onChange={(e) => setNombre(e.target.value)} />

          <label className="label">Categoría</label>
          <select className="select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option>Hombre</option>
            <option>Mujer</option>
            <option>Accesorios</option>
            <option>Calzado</option>
          </select>

          <label className="label">Precio</label>
          <input
            className="input"
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />

          <label className="label">Descripción</label>
          <textarea className="textarea" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

          <label className="label">Imágenes (1 URL por línea)</label>
          <textarea
            className="textarea"
            value={imagenesTxt}
            onChange={(e) => setImagenesTxt(e.target.value)}
            placeholder="https://...\nhttps://..."
          />

          {err && <div className="err" style={{ marginTop: 10 }}>{err}</div>}

          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn btn-primary" type="submit" disabled={creando || editando}>
              {modo === 'crear' ? 'Crear' : 'Guardar'}
            </button>
            <button className="btn" type="button" onClick={() => navigate('/productos')}>
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <div className="h2">Stock por talla</div>
        <div className="grid">
          {tallas.map((t) => (
            <div key={t.talla} className="row">
              <span className="badge">{t.talla}</span>
              <input
                className="input"
                type="number"
                value={t.stock}
                onChange={(e) => onStock(t.talla, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="h2">Preview imágenes</div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {imagenes.slice(0, 6).map((u) => (
              <div key={u} className="card" style={{ padding: 10 }}>
                <img
                  src={u}
                  alt="producto"
                  style={{ width: '100%', borderRadius: 12, border: '1px solid var(--border)' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="muted" style={{ fontSize: 11, marginTop: 6, wordBreak: 'break-all' }}>
                  {u}
                </div>
              </div>
            ))}
            {imagenes.length === 0 && <div className="muted">Sin URLs</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
