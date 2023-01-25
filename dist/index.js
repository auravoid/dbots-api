"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBot = exports.getBots = void 0;
const BASE_URL = "https://discord.bots.gg/api/v1";
const node_fetch_native_1 = __importDefault(require("node-fetch-native"));
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
function getBots(
  query,
  page = 0,
  limit = 50,
  authorId,
  authorName,
  unverified = false,
  lib,
  sort,
  order = "asc"
) {
  return __awaiter(this, void 0, void 0, function* () {
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
    const res = yield (0, node_fetch_native_1.default)(url.toString());
    const data = yield res.json();
    return data;
  });
}
exports.getBots = getBots;
/**
 * @name getBot
 * @description Get a bot
 * @param {BigInt} id - Bot ID
 * @returns {Promise<Bot>}
 */
function getBot(id) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!id) throw new Error("No ID provided");
    const res = yield (0, node_fetch_native_1.default)(
      `${BASE_URL}/bots/${id}`
    );
    const data = yield res.json();
    return data;
  });
}
exports.getBot = getBot;
