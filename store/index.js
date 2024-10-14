import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth-slice';
import { notificationReducer } from './notification-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
