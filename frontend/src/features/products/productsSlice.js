import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../../services/api";

const initialState = {
  items: [],
  current: null,
  status: "idle",
  error: null,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      // público: lista para tienda (no token)
      const data = await apiFetch("/api/productos");
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return rejectWithValue(e?.message || "Error al cargar productos");
    }
  }
);

export const fetchProductsAdmin = createAsyncThunk(
  "products/fetchAdmin",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      // admin: si tu backend pide token, lo mandas aquí
      const data = await apiFetch("/api/productos", { token });
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return rejectWithValue(e?.message || "Error al cargar productos (admin)");
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getOne",
  async (id, { rejectWithValue }) => {
    try {
      return await apiFetch(`/api/productos/${id}`);
    } catch (e) {
      return rejectWithValue(e?.message || "Error al cargar producto");
    }
  }
);

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getProducts.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    b.addCase(getProducts.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.items = a.payload || [];
    });
    b.addCase(getProducts.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.payload || a.error.message;
    });

    b.addCase(fetchProductsAdmin.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    b.addCase(fetchProductsAdmin.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.items = a.payload || [];
    });
    b.addCase(fetchProductsAdmin.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.payload || a.error.message;
    });

    b.addCase(getProduct.pending, (s) => {
      s.current = null;
    });
    b.addCase(getProduct.fulfilled, (s, a) => {
      s.current = a.payload || null;
    });
    b.addCase(getProduct.rejected, (s) => {
      s.current = null;
    });
  },
});

export default slice.reducer;
