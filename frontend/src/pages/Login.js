import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, fetchMe } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("admin@maja.com");
  const [password, setPassword] = useState("123456");

  const dispatch = useDispatch();
  const nav = useNavigate();
  const { status, error, token } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchMe());
      nav("/", { replace: true });
    }
  }, [token, dispatch, nav]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="card formCard">
      <h2 style={{ margin: 0 }}>Login</h2>
      <p className="muted">Inicia sesión para administrar productos, ventas y reportes.</p>

      <form onSubmit={onSubmit}>
        <div className="field">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <div className="error">{error}</div>}

        <button className="primaryBtn" disabled={status === "loading"}>
          {status === "loading" ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
