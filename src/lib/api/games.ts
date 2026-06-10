import { z } from "zod";
import { api } from "./client";
import { gameSchema, type Game } from "./schemas";

export type PriceUpdate = { id: string; price?: number; discount?: number };

export async function listGames(params?: {
  search?: string;
}): Promise<Game[]> {
  const res = await api.get("/admin/games", { params });
  return z.array(gameSchema).parse(res.data.data);
}

export async function getGame(id: string): Promise<Game> {
  const res = await api.get(`/admin/games/${id}`);
  return gameSchema.parse(res.data.data);
}

export async function createGame(form: FormData): Promise<Game> {
  const res = await api.post("/admin/games", form);
  return gameSchema.parse(res.data.data);
}

export async function updateGame(id: string, form: FormData): Promise<Game> {
  const res = await api.put(`/admin/games/${id}`, form);
  return gameSchema.parse(res.data.data);
}

export async function deleteGame(id: string): Promise<void> {
  await api.delete(`/admin/games/${id}`);
}

export async function updatePrices(updates: PriceUpdate[]): Promise<void> {
  await api.patch("/admin/games/prices", { updates });
}
