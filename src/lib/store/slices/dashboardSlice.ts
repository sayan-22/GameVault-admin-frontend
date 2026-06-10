import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDashboard } from "@/src/lib/api/dashboard";
import { apiError } from "@/src/lib/api/client";
import type { Dashboard } from "@/src/lib/api/schemas";

type Status = "idle" | "loading" | "succeeded" | "failed";

type DashboardState = {
  data: Dashboard | null;
  status: Status;
  error: string | null;
};

const initialState: DashboardState = { data: null, status: "idle", error: null };

export const fetchDashboard = createAsyncThunk("dashboard/fetch", async (_: void, { rejectWithValue }) => {
  try {
    return await getDashboard();
  } catch (e) {
    return rejectWithValue(apiError(e, "Could not load dashboard"));
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Could not load dashboard";
      });
  },
});

export default dashboardSlice.reducer;
