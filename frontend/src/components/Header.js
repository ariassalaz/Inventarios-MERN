import React, { useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((s) => s.auth.user);
  const cartItems = useSelector((s) => s.cart.items || []);

  const cartCount = cartItems.reduce(
    (acc, it) => acc + Number(it.cantidad || 0),
    0
  );

  const isAdmin = useMemo(() => {
    const rol = user?.rol || user?.role;
    return rol === "admin";
  }, [user]);

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="container topbarInner">
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            Tienda
          </NavLink>

          <NavLink
            to="/categoria/Hombre"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            Hombre
          </NavLink>

          <NavLink
            to="/categoria/Mujer"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            Mujer
          </NavLink>

          <NavLink
            to="/carrito"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            Carrito
            {cartCount > 0 && <span className="cartBadge">{cartCount}</span>}
          </NavLink>

          {!user ? (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
            >
              Iniciar sesión
            </NavLink>
          ) : (
            <>
              <span className="navUser">{user.nombre || user.email}</span>

              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
                >
                  Inventarios
                </NavLink>
              )}

              <button className="navBtn" onClick={onLogout}>
                Salir
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
