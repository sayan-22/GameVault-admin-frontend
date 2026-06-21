import { z } from "zod";
import authAxios from "./authAxios";
import { API_URLS } from "./AllAPIUrls";
import { gameSchema, type Game } from "./schemas";

export type PriceUpdate = { id: string; price?: number; discount?: number };

export async function listGames(params?: {
  search?: string;
}): Promise<Game[]> {
  const res = await authAxios.get(API_URLS.games.list, { params });
  return z.array(gameSchema).parse(res.data.data);
}

export async function getGame(id: string): Promise<Game> {
  const res = await authAxios.get(API_URLS.games.byId(id));
  return gameSchema.parse(res.data.data);
}

export async function createGame(form: FormData): Promise<Game> {
  const res = await authAxios.post(API_URLS.games.create, form);
  return gameSchema.parse(res.data.data);
}

export async function updateGame(id: string, form: FormData): Promise<Game> {
  const res = await authAxios.put(API_URLS.games.byId(id), form);
  return gameSchema.parse(res.data.data);
}

export async function deleteGame(id: string): Promise<void> {
  await authAxios.delete(API_URLS.games.byId(id));
}

export async function updatePrices(updates: PriceUpdate[]): Promise<void> {
  await authAxios.patch(API_URLS.games.prices, { updates });
}
