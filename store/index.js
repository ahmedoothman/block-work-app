import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-slice";
import { notificationReducer } from "./notification-slice";
import { themeReducer } from "./theme_slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    themeMode: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
