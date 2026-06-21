import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { logoutThunk } from "./slices/authSlice";
import gamesReducer from "./slices/gamesSlice";
import ordersReducer from "./slices/ordersSlice";
import dashboardReducer from "./slices/dashboardSlice";

// All the app's slices combined into one reducer.
const appReducer = combineReducers({
  auth: authReducer,
  games: gamesReducer,
  orders: ordersReducer,
  dashboard: dashboardReducer,
});

// Root reducer. On logout we pass `undefined` as the state, which makes EVERY
// slice fall back to its own initialState — so the next admin who logs in on
// this browser never sees the previous admin's games/orders/dashboard data.
const rootReducer: typeof appReducer = (state, action) => {
  if (action.type === logoutThunk.fulfilled.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
