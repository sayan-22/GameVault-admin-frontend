import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import * as authApi from "@/src/lib/services/auth";
import { apiError } from "@/src/lib/services/authAxios";
import { getStoredUser, type StoredUser } from "@/src/lib/auth/storage";

type AuthState = {
  user: StoredUser | null;
  initializing: boolean;
};

const initialState: AuthState = { user: null, initializing: true };

export const bootstrapAuth = createAsyncThunk(
  "auth/bootstrap",
  async (_: void, { rejectWithValue }) => {
    // The auth cookie (if any) is httpOnly, so JS can't peek at it — just ask
    // /me. The cookie rides along automatically; a 401 means "no session".
    try {
      return await authApi.fetchMe();
    } catch {
      return rejectWithValue("no-session");
    }
  }
);

export const signinThunk = createAsyncThunk(
  "auth/signin",
  async (
    p: { email: string; password: string; remember: boolean },
    { rejectWithValue }
  ) => {
    try {
      return await authApi.signin(p.email, p.password, p.remember);
    } catch (e) {
      return rejectWithValue(apiError(e, "Could not sign in"));
    }
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (p: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      return await authApi.signup(p.name, p.email, p.password);
    } catch (e) {
      return rejectWithValue(apiError(e, "Could not create account"));
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgot",
  async (email: string, { rejectWithValue }) => {
    try {
      await authApi.forgotPassword(email);
    } catch (e) {
      return rejectWithValue(apiError(e, "Could not send reset link"));
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "auth/reset",
  async (p: { token: string; password: string }, { rejectWithValue }) => {
    try {
      await authApi.resetPassword(p.token, p.password);
    } catch (e) {
      return rejectWithValue(apiError(e, "Could not reset password"));
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", () => authApi.logout());

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Hydrate from localStorage on the client before the /me round-trip.
    hydrate(state) {
      state.user = getStoredUser();
    },
    setUser(state, action: PayloadAction<StoredUser | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.initializing = false;
      })
      .addCase(bootstrapAuth.rejected, (state) => {
        state.user = null;
        state.initializing = false;
      })
      .addCase(signinThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { hydrate, setUser } = authSlice.actions;
export default authSlice.reducer;
