import { apiSlice } from '../api/apiSlice';

export const ventasApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVentas: builder.query({
      query: () => ({ url: '/ventas', method: 'GET' }),
      providesTags: ['Ventas'],
    }),
    getVenta: builder.query({
      query: (id) => ({ url: `/ventas/${id}`, method: 'GET' }),
      providesTags: (r, e, id) => [{ type: 'Ventas', id }],
    }),
    crearVenta: builder.mutation({
      query: (data) => ({ url: '/ventas', method: 'POST', body: data }),
      invalidatesTags: ['Ventas', 'Productos', 'Reportes'],
    }),
  }),
});

export const { useGetVentasQuery, useGetVentaQuery, useCrearVentaMutation } =
  ventasApiSlice;
