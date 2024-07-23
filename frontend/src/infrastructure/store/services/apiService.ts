import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: () => ({}),
});

export default apiService;
