import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import gamesReducer from "./slices/gamesSlice";
import ordersReducer from "./slices/ordersSlice";
import dashboardReducer from "./slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
    orders: ordersReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
