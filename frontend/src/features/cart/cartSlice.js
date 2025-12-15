import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../../services/api";

const LS_KEY = "inventarios_cart";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const loadCartFromStorage = createAsyncThunk("cart/load", async () => {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
});

export const checkoutCart = createAsyncThunk(
  "cart/checkout",
  async (_, { getState, rejectWithValue }) => {
    const { auth, cart } = getState();
    const token = auth.token;

    if (!token) return rejectWithValue("Debes iniciar sesión para comprar");
    if (!cart.items || cart.items.length === 0) return rejectWithValue("Carrito vacío");

    const payload = {
      items: cart.items.map((it) => ({
        productoId: it.productoId,
        talla: it.talla,
        cantidad: Number(it.cantidad || 0),
        precio: Number(it.precio || 0),
        nombre: it.nombre,
        imagen: it.imagen,
      })),
    };

    return apiFetch("/api/ventas", { method: "POST", token, body: payload });
  }
);

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const it = action.payload;
      const key = `${it.productoId}-${it.talla}`;
      const existing = state.items.find((x) => `${x.productoId}-${x.talla}` === key);

      if (existing) {
        existing.cantidad = Number(existing.cantidad || 0) + Number(it.cantidad || 1);
      } else {
        state.items.push({ ...it, cantidad: Number(it.cantidad || 1) });
      }

      localStorage.setItem(LS_KEY, JSON.stringify(state.items));
    },
    removeFromCart(state, action) {
      const { productoId, talla } = action.payload;
      state.items = state.items.filter((x) => !(x.productoId === productoId && x.talla === talla));
      localStorage.setItem(LS_KEY, JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.setItem(LS_KEY, JSON.stringify([]));
    },
    setQty(state, action) {
      const { productoId, talla, cantidad } = action.payload;
      const it = state.items.find((x) => x.productoId === productoId && x.talla === talla);
      if (it) it.cantidad = Math.max(1, Number(cantidad || 1));
      localStorage.setItem(LS_KEY, JSON.stringify(state.items));
    },
  },
  extraReducers: (b) => {
    b.addCase(loadCartFromStorage.fulfilled, (s, a) => {
      s.items = a.payload || [];
    });

    b.addCase(checkoutCart.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    b.addCase(checkoutCart.fulfilled, (s) => {
      s.status = "succeeded";
      s.items = [];
      localStorage.setItem(LS_KEY, JSON.stringify([]));
    });
    b.addCase(checkoutCart.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.payload || a.error.message;
    });
  },
});

export const { addToCart, removeFromCart, clearCart, setQty } = slice.actions;
export default slice.reducer;
