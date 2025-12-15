import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../../services/api";

const LS_KEY = "inventarios_auth";

const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

function normalizeAuthPayload(payload) {
  if (payload?.token && payload?.usuario) {
    return { token: payload.token, user: payload.usuario };
  }

  if (payload?.token && payload?.user) {
    return { token: payload.token, user: payload.user };
  }

  if (payload?.token && (payload?.email || payload?.nombre || payload?._id)) {
    const { token, ...user } = payload;
    return { token, user };
  }

  return { token: null, user: null };
}

export const login = createAsyncThunk("auth/login", async (cred) => {
  return apiFetch("/api/usuarios/login", { method: "POST", body: cred });
});

export const fetchMe = createAsyncThunk("auth/me", async (_, { getState }) => {
  const { token } = getState().auth;
  return apiFetch("/api/usuarios/yo", { token });
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem(LS_KEY);
    },
    loadUserFromStorage(state) {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      try {
        const saved = JSON.parse(raw);
        state.token = saved.token || null;
        state.user = saved.user || null;
      } catch {}
    },
  },
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });

    b.addCase(login.fulfilled, (s, a) => {
      s.status = "succeeded";

      const { token, user } = normalizeAuthPayload(a.payload);

      if (token) s.token = token;
      if (user) s.user = user;

      localStorage.setItem(LS_KEY, JSON.stringify({ token: s.token, user: s.user }));
    });

    b.addCase(login.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.error?.message || "Error de login";
    });

    b.addCase(fetchMe.pending, (s) => {
      s.error = null;
    });

    b.addCase(fetchMe.fulfilled, (s, a) => {
      s.user = a.payload;
      localStorage.setItem(LS_KEY, JSON.stringify({ token: s.token, user: s.user }));
    });

    b.addCase(fetchMe.rejected, (s, a) => {
      s.error = a.error?.message || "Sesión inválida";
    });
  },
});

export const { logout, loadUserFromStorage } = slice.actions;
export default slice.reducer;