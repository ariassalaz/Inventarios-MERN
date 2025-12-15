import { apiSlice } from '../api/apiSlice';

export const reportesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    resumenVentas: builder.query({
      query: () => ({ url: '/reportes/ventas/resumen', method: 'GET' }),
      providesTags: ['Reportes'],
    }),
    resumenInventario: builder.query({
      query: () => ({ url: '/reportes/inventario/resumen', method: 'GET' }),
      providesTags: ['Reportes'],
    }),
  }),
});

export const { useResumenVentasQuery, useResumenInventarioQuery } =
  reportesApiSlice;