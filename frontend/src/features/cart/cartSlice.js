import { createSlice } from "@reduxjs/toolkit";

const load = () => {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const save = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch {}
};

const initialState = {
  items: load(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const it = action.payload; // {productoId,nombre,precio,imagen,talla,cantidad,stock}
      const idx = state.items.findIndex((x) => x.productoId === it.productoId && x.talla === it.talla);

      if (idx >= 0) {
        const nueva = Math.min(Number(state.items[idx].stock || it.stock || 0), Number(state.items[idx].cantidad || 0) + Number(it.cantidad || 1));
        state.items[idx].cantidad = nueva;
        // actualiza imagen/precio/stock por si cambiaron
        state.items[idx].precio = it.precio;
        state.items[idx].imagen = it.imagen;
        state.items[idx].stock = it.stock;
      } else {
        state.items.push({
          productoId: it.productoId,
          nombre: it.nombre,
          precio: it.precio,
          imagen: it.imagen,
          talla: it.talla,
          cantidad: Math.max(1, Number(it.cantidad || 1)),
          stock: Number(it.stock || 0),
        });
      }

      save(state.items);
    },

    updateQty: (state, action) => {
      const { productoId, talla, cantidad } = action.payload;
      const idx = state.items.findIndex((x) => x.productoId === productoId && x.talla === talla);
      if (idx >= 0) {
        const max = Number(state.items[idx].stock || 1);
        state.items[idx].cantidad = Math.max(1, Math.min(Number(cantidad || 1), max));
        save(state.items);
      }
    },

    removeFromCart: (state, action) => {
      const { productoId, talla } = action.payload;
      state.items = state.items.filter((x) => !(x.productoId === productoId && x.talla === talla));
      save(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      save(state.items);
    },
  },
});

export const { addToCart, updateQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
