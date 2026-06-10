import { z } from "zod";

// Zod schemas that mirror the backend's serialized shapes. Unknown keys the
// backend includes but the admin UI doesn't use (genre, stock, status,
// coverColor, trending, reviews, …) are stripped by default. Mongo's `_id` is
// normalized to `id` via .transform so the UI can use one convention.

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
});
export type User = z.infer<typeof userSchema>;

export const authDataSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  user: userSchema,
});

export const systemRequirementsSchema = z.object({
  minimum: z.record(z.string(), z.string()).default({}),
  recommended: z.record(z.string(), z.string()).default({}),
});

export const gameSchema = z
  .object({
    _id: z.string(),
    title: z.string(),
    slug: z.string().default(""),
    developer: z.string().default(""),
    publisher: z.string().default(""),
    tags: z.array(z.string()).default([]),
    description: z.string().default(""),
    price: z.number().default(0),
    discount: z.number().default(0),
    free: z.boolean().default(false),
    releaseDate: z.string().default(""),
    cover: z.string().default(""),
    banner: z.string().default(""),
    trailer: z.string().default(""),
    heroVideo: z.string().default(""),
    screenshots: z.array(z.string()).default([]),
    systemRequirements: systemRequirementsSchema.default({
      minimum: {},
      recommended: {},
    }),
    trending: z.boolean().default(false),
    rating: z.number().default(0),
    reviewCount: z.number().default(0),
  })
  .transform((g) => ({ ...g, id: g._id }));
export type Game = z.infer<typeof gameSchema>;
export type SystemRequirements = z.infer<typeof systemRequirementsSchema>;

export const orderItemSchema = z.object({
  gameId: z.string(),
  title: z.string(),
  price: z.number(),
});

export const orderStatusSchema = z.enum(["pending", "paid", "failed"]);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderSchema = z
  .object({
    _id: z.string(),
    items: z.array(orderItemSchema).default([]),
    amount: z.number().default(0),
    currency: z.string().default("usd"),
    status: orderStatusSchema,
    createdAt: z.string(),
  })
  .transform((o) => ({ ...o, id: o._id }));
export type Order = z.infer<typeof orderSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;

export const dashboardSchema = z.object({
  stats: z.object({
    revenue: z.number(),
    units: z.number(),
    paidOrders: z.number(),
    avgOrderValue: z.number(),
  }),
  ordersByStatus: z
    .array(z.object({ label: z.string(), value: z.number() }))
    .default([]),
  topPerformers: z
    .array(
      z.object({
        gameId: z.string(),
        title: z.string(),
        revenue: z.number(),
        units: z.number(),
      })
    )
    .default([]),
  recentOrders: z
    .array(
      z.object({
        id: z.string(),
        items: z.array(orderItemSchema).default([]),
        amount: z.number(),
        currency: z.string().default("usd"),
        status: orderStatusSchema,
        createdAt: z.string(),
      })
    )
    .default([]),
});
export type Dashboard = z.infer<typeof dashboardSchema>;
