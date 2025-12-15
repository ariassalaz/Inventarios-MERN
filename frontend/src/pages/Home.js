import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../features/products/productsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { items = [], status, error } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const heroImg = items?.[0]?.imagenes?.[0];

  return (
    <>
      <section className="container">
        <div className="sectionTitle">Lo más nuevo</div>

        {status === "loading" && <p className="muted">Cargando productos...</p>}
        {status === "failed" && <p className="error">{error || "Error"}</p>}

        <div className="productsGrid">
          {items.slice(0, 9).map((p) => (
            <ProductCard key={p._id} producto={p} />
          ))}
        </div>
      </section>
    </>
  );
}
