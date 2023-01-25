const BASE_URL = "https://discord.bots.gg/api/v1";

import fetch from "node-fetch-native";

import { Bot, BotData, BotStats } from "./types";

/**
 * @name getBots
 * @description Get an array of bots
 * @param {string} [query] - Search query
 * @param {number} [page=0] - Page number
 * @param {number} [limit=50] - Limit of bots per page
 * @param {BigInt} [authorId] - Author ID
 * @param {string} [authorName] - Author Name
 * @param {boolean} [unverified] - Unverified bots
 * @param {string} [lib] - Library
 * @param {string} [sort] - Sort by
 * @param {string} [order] - Order
 * @returns {Promise<Bot[]>}
 */
export async function getBots(
  query: string,
  page: number = 0,
  limit: number = 50,
  authorId?: BigInt,
  authorName?: string,
  unverified: boolean = false,
  lib?: string,
  sort?: "username" | "id" | "guildcount" | "library" | "author",
  order: "asc" | "desc" = "asc"
): Promise<BotData[]> {
  if (page < 0) throw new Error("Page number cannot be less than 0");
  if (limit < 0) throw new Error("Limit cannot be less than 0");
  if (limit > 100) throw new Error("Limit cannot be more than 100");
  if (
    sort &&
    !["username", "id", "guildcount", "library", "author"].includes(sort)
  )
    throw new Error("Invalid sort");
  if (order && !["asc", "desc"].includes(order))
    throw new Error("Invalid order");

  const url = new URL(`${BASE_URL}/bots`);
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (authorId) params.set("authorId", authorId.toString());
  if (authorName) params.set("authorName", authorName);
  if (unverified) params.set("unverified", unverified.toString());
  if (lib) params.set("lib", lib);
  if (sort) params.set("sort", sort);
  if (order) params.set("order", order);
  url.search = params.toString();
  console.log(url.toString());
  const res = await fetch(url.toString());
  const data = await res.json();
  return data;
}

/**
 * @name getBot
 * @description Get a bot
 * @param {BigInt} id - Bot ID
 * @returns {Promise<Bot>}
 */
export async function getBot(id: BigInt): Promise<Bot> {
  if (!id) throw new Error("No ID provided");
  const res = await fetch(`${BASE_URL}/bots/${id}`);
  const data = await res.json();
  return data;
}

/**
 * @name postStats
 * @description Post bot stats [Auth Required]
 * @param {BigInt} id - Bot ID
 * @param {number} guildCount - Guild count
 * @param {number} shardCount - Shard count
 * @param {string} token - Auth token
 * @returns {Promise<Bot>}
 */
export async function postStats(
  token: string,
  id: BigInt,
  guildCount: number,
  shardCount?: number
): Promise<BotStats> {
  if (!id) throw new Error("No ID provided");
  if (!guildCount) throw new Error("No guild count provided");
  const res = await fetch(`${BASE_URL}/bots/${id}/stats`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      guildCount,
      shardCount,
    }),
  });
  const data = await res.json();
  return data;
}
