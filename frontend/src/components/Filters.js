import React from "react";

export default function Filters({ categoria, setCategoria, soloConStock, setSoloConStock, q, setQ }) {
  return (
    <aside className="card filters">
      <h3>Filtros</h3>

      <div className="filterGroup">
        <div className="filterLabel">
          <span>Búsqueda</span>
          <span className="muted">texto</span>
        </div>
        <input
          style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid var(--line)" }}
          placeholder="Ej: Camisa, Chamarra..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="filterGroup">
        <div className="filterLabel">
          <span>Categoría</span>
          <span className="muted">{categoria}</span>
        </div>
        <div className="pillRow">
          {["Todo", "Hombre", "Mujer"].map((c) => (
            <button
              key={c}
              className={`pill ${categoria === c ? "active" : ""}`}
              onClick={() => setCategoria(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="filterGroup">
        <div className="filterLabel">
          <span>Disponibilidad</span>
          <span className="muted">{soloConStock ? "Con stock" : "Todos"}</span>
        </div>
        <div className="pillRow">
          <button
            className={`pill ${!soloConStock ? "active" : ""}`}
            onClick={() => setSoloConStock(false)}
          >
            Todos
          </button>
          <button
            className={`pill ${soloConStock ? "active" : ""}`}
            onClick={() => setSoloConStock(true)}
          >
            Con stock
          </button>
        </div>
      </div>
    </aside>
  );
}
