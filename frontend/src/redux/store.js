import { configureStore } from "@reduxjs/toolkit";
// import { setupListener } from "@reduxjs/toolkit/query/react";
import authSlice from "./features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// setupListener(store.dispatch);

export default store;
