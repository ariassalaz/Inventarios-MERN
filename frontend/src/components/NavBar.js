import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function NavBar() {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((s) => s.auth);
  const cartItems = useSelector((s) => s.cart?.items || []);

  const cartCount = useMemo(
    () => cartItems.reduce((acc, it) => acc + (Number(it.cantidad) || 0), 0),
    [cartItems]
  );

  const isAdmin = useMemo(() => {
    const rol = user?.rol || user?.role;
    return rol === "admin";
  }, [user]);

  const onSearch = (e) => {
    e.preventDefault();
    nav(`/categoria/Todo?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="header">
      <div className="topbar">¡Empaque navideño GRATIS en todos tus pedidos!</div>

      <div className="container">
        <div className="headerRow">
          <Link to="/" className="brand" aria-label="Inicio">
          </Link>

          <form className="search" onSubmit={onSearch}>
            <span className="searchIcon" aria-hidden="true">🔎</span>
            <input
              placeholder="Buscar en MAJA"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </form>

          <div className="headerActions">
            <Link className="iconBtn" to="/carrito" title="Carrito" aria-label="Carrito">
              🛒 <span className="badge">{cartCount}</span>
            </Link>

            {isAdmin && (
              <Link className="iconBtn" to="/admin" title="Inventarios" aria-label="Inventarios">
                ⚙️
              </Link>
            )}

            {user ? (
              <button className="iconBtn" onClick={() => dispatch(logout())}>
                Salir
              </button>
            ) : (
              <Link className="iconBtn" to="/login">
                Entrar
              </Link>
            )}
          </div>
        </div>

        <div className="navRow">
          <nav className="navLinks">
            <Link to="/categoria/Hombre">Hombre</Link>
            <Link to="/categoria/Mujer">Mujer</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
