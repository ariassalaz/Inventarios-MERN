import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import carritoReducer from "./features/carrito/carritoSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    carrito: carritoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
});
