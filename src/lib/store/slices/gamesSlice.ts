import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as gamesApi from "@/src/lib/services/games";
import type { PriceUpdate } from "@/src/lib/services/games";
import { apiError } from "@/src/lib/services/authAxios";
import type { Game } from "@/src/lib/services/schemas";

type Status = "idle" | "loading" | "succeeded" | "failed";

type GamesState = {
  list: Game[];
  listStatus: Status;
  listError: string | null;
  current: Game | null;
  currentStatus: Status;
  currentError: string | null;
};

const initialState: GamesState = {
  list: [],
  listStatus: "idle",
  listError: null,
  current: null,
  currentStatus: "idle",
  currentError: null,
};

export const fetchGames = createAsyncThunk(
  "games/fetchAll",
  async (search: string | undefined, { rejectWithValue }) => {
    try {
      return await gamesApi.listGames(search ? { search } : undefined);
    } catch (e) {
      return rejectWithValue(apiError(e, "Could not load games"));
    }
  }
);

export const fetchGameById = createAsyncThunk("games/fetchOne", async (id: string, { rejectWithValue }) => {
  try {
    return await gamesApi.getGame(id);
  } catch (e) {
    return rejectWithValue(apiError(e, "Game not found"));
  }
});

export const createGameThunk = createAsyncThunk("games/create", async (form: FormData, { rejectWithValue }) => {
  try {
    return await gamesApi.createGame(form);
  } catch (e) {
    return rejectWithValue(apiError(e, "Could not save the game"));
  }
});

export const updateGameThunk = createAsyncThunk(
  "games/update",
  async (p: { id: string; form: FormData }, { rejectWithValue }) => {
    try {
      return await gamesApi.updateGame(p.id, p.form);
    } catch (e) {
      return rejectWithValue(apiError(e, "Could not save the game"));
    }
  }
);

export const deleteGameThunk = createAsyncThunk("games/delete", async (id: string, { rejectWithValue }) => {
  try {
    await gamesApi.deleteGame(id);
    return id;
  } catch (e) {
    return rejectWithValue(apiError(e, "Could not delete the game"));
  }
});

export const updatePricesThunk = createAsyncThunk(
  "games/updatePrices",
  async (updates: PriceUpdate[], { rejectWithValue }) => {
    try {
      await gamesApi.updatePrices(updates);
    } catch (e) {
      return rejectWithValue(apiError(e, "Could not save prices"));
    }
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.listStatus = "loading";
        state.listError = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.listStatus = "failed";
        state.listError = (action.payload as string) ?? "Could not load games";
      })
      .addCase(fetchGameById.pending, (state) => {
        state.currentStatus = "loading";
        state.currentError = null;
        state.current = null;
      })
      .addCase(fetchGameById.fulfilled, (state, action) => {
        state.currentStatus = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchGameById.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.currentError = (action.payload as string) ?? "Game not found";
      });
  },
});

export default gamesSlice.reducer;
