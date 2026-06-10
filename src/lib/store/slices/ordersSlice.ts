import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listOrders } from "@/src/lib/api/orders";
import { apiError } from "@/src/lib/api/client";
import type { Order } from "@/src/lib/api/schemas";

type Status = "idle" | "loading" | "succeeded" | "failed";

type OrdersState = {
  list: Order[];
  status: Status;
  error: string | null;
};

const initialState: OrdersState = { list: [], status: "idle", error: null };

export const fetchOrders = createAsyncThunk("orders/fetchAll", async (_: void, { rejectWithValue }) => {
  try {
    return await listOrders("all");
  } catch (e) {
    return rejectWithValue(apiError(e, "Could not load orders"));
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Could not load orders";
      });
  },
});

export default ordersSlice.reducer;
