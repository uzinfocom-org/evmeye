import { configureStore } from '@reduxjs/toolkit';
import networksSlice, { networksMiddleware } from './slices/networksSlice';

export const store = configureStore({
  reducer: {
    networks: networksSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(networksMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
