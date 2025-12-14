import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '@/shared/api';
import { themeStore } from "@/features/theme";

export const store = configureStore({
  reducer: {
      [api.reducerPath]: api.reducer,
      [themeStore.reducerPath]: themeStore.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
