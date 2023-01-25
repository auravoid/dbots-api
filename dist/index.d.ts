import { Bot, BotData } from "./types";
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
 * @example
 * const bots = await getBots()
 * console.log(bots)
 *
 */
export declare function getBots(
  query: string,
  page?: number,
  limit?: number,
  authorId?: BigInt,
  authorName?: string,
  unverified?: boolean,
  lib?: string,
  sort?: "username" | "id" | "guildcount" | "library" | "author",
  order?: "asc" | "desc"
): Promise<BotData[]>;
/**
 * @name getBot
 * @description Get a bot
 * @param {BigInt} id - Bot ID
 * @returns {Promise<Bot>}
 */
export declare function getBot(id: BigInt): Promise<Bot>;
