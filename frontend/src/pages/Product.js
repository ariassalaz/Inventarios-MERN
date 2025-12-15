import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const p = useSelector((s) => s.products.current);
  const status = useSelector((s) => s.products.status);

  const [imgIndex, setImgIndex] = useState(0);
  const [talla, setTalla] = useState("");
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    dispatch(getProduct(id));
    setImgIndex(0);
    setTalla("");
    setCantidad(1);
  }, [dispatch, id]);

  const images = useMemo(() => p?.imagenes || [], [p]);
  const selectedImg = images[imgIndex] || images[0];

  const tallas = useMemo(() => p?.tallas || [], [p]);

  const tallaObj = useMemo(() => {
    if (!talla) return null;
    return (p?.tallas || []).find((x) => x.talla === talla) || null;
  }, [p, talla]);

  const stockDisponible = Number(tallaObj?.stock || 0);

  const handleAddToCart = () => {
    if (!p) return;

    if (!talla) {
      alert("Selecciona una talla");
      return;
    }

    if (cantidad < 1) {
      alert("Cantidad inválida");
      return;
    }

    if (cantidad > stockDisponible) {
      alert(`Solo hay ${stockDisponible} disponibles en talla ${talla}`);
      return;
    }

    dispatch(
      addToCart({
        productoId: p._id,
        nombre: p.nombre,
        precio: p.precio,
        imagen: p.imagenes?.[0],
        talla,
        cantidad,
        stock: stockDisponible,
      })
    );

  };

  if (status === "loading" || !p) {
    return (
      <div className="container" style={{ padding: 24 }}>
        Cargando...
      </div>
    );
  }

  return (
    <section className="container">
      <div className="productPage">
        <div className="gallery">
          <div className="thumbs">
            {images.map((url, i) => (
              <button
                key={url + i}
                className={`thumb ${i === imgIndex ? "active" : ""}`}
                onClick={() => setImgIndex(i)}
                type="button"
              >
                <img src={url} alt={`thumb-${i}`} />
              </button>
            ))}
          </div>

          <div className="big">
            {selectedImg ? <img src={selectedImg} alt={p.nombre} /> : null}
          </div>
        </div>

        <div className="card pdp">
          <h1>{p.nombre}</h1>
          <div className="muted">{p.categoria}</div>

          <div className="priceLg">
            ${Number(p.precio).toLocaleString("es-MX")}.00
          </div>

          <div className="muted" style={{ marginBottom: 10 }}>
            {p.descripcion}
          </div>

          <div style={{ marginTop: 10, fontWeight: 700 }}>Talla:</div>
          <div className="sizeRow">
            {tallas.map((x) => (
              <button
                key={x.talla}
                className={`sizeBtn ${talla === x.talla ? "active" : ""}`}
                onClick={() => setTalla(x.talla)}
                disabled={(x.stock || 0) <= 0}
                type="button"
                title={(x.stock || 0) <= 0 ? "Sin stock" : `Stock: ${x.stock}`}
              >
                {x.talla}
              </button>
            ))}
          </div>

          <div className="qtyRow">
            <span className="muted">Cantidad</span>
            <input
              className="qtyInput"
              type="number"
              min="1"
              max={stockDisponible || 999}
              value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, Number(e.target.value || 1)))}
            />
            {talla ? (
              <span className="muted" style={{ marginLeft: "auto" }}>
                Stock: {stockDisponible}
              </span>
            ) : null}
          </div>

          <button className="primaryBtn" onClick={handleAddToCart} type="button">
            Agregar al carrito
          </button>

          <div style={{ marginTop: 14 }}>
            <Link className="linkBtn" to="/carrito">
              Ver carrito →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}