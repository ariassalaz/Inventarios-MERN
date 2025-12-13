import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../../services/api";

export const getProducts = createAsyncThunk("products/list", async () => {
  return apiFetch("/api/productos");
});

export const getProduct = createAsyncThunk("products/one", async (id) => {
  return apiFetch(`/api/productos/${id}`);
});

const slice = createSlice({
  name: "products",
  initialState: {
    items: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getProducts.pending, (s) => {
      s.status = "loading";
      s.error = null;
    })
      .addCase(getProducts.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload || [];
      })
      .addCase(getProducts.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message;
      })
      .addCase(getProduct.pending, (s) => {
        s.current = null;
      })
      .addCase(getProduct.fulfilled, (s, a) => {
        s.current = a.payload;
      });
  },
});

export default slice.reducer;
