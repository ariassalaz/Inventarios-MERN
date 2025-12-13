import { apiSlice } from '../api/apiSlice';

export const productosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductos: builder.query({
      query: () => ({ url: '/productos', method: 'GET' }),
      providesTags: ['Productos'],
    }),
    getProducto: builder.query({
      query: (id) => ({ url: `/productos/${id}`, method: 'GET' }),
      providesTags: (r, e, id) => [{ type: 'Productos', id }],
    }),
    crearProducto: builder.mutation({
      query: (data) => ({ url: '/productos', method: 'POST', body: data }),
      invalidatesTags: ['Productos'],
    }),
    actualizarProducto: builder.mutation({
      query: ({ id, data }) => ({
        url: `/productos/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Productos'],
    }),
    eliminarProducto: builder.mutation({
      query: (id) => ({ url: `/productos/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Productos'],
    }),
  }),
});

export const {
  useGetProductosQuery,
  useGetProductoQuery,
  useCrearProductoMutation,
  useActualizarProductoMutation,
  useEliminarProductoMutation,
} = productosApiSlice;
