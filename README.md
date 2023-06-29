# dbots-api

A simple wrapper for [Discord Bots](https://discord.bots.gg/) written in Typescript.

There are three functions to this package. 

 - `getBots`: get an array of bots with optional query parameters.
 - `getBot`: get a single bot by ID.
 - `postStats`: update bot stats for a given bot ID.

The API requires a valid token for certain functions. The `postStats` function requires an authorization token to be passed in the headers. You can get a token by going to [https://discord.bots.gg/docs](https://discord.bots.gg/docs).

## Usage

To use this module, import the desired function and call it with the necessary parameters.

```typescript
import { getBots, getBot, postStats } from "./discord-bots-api-client";

// get all bots
const bots = await getBots();

// get a specific bot by ID
const bot = await getBot("847427963032174613");

// update bot stats
const stats = await postStats("your-wonderful-token", "847427963032174613", 100, 1);
```

## Functions

```typescript
getBots(        // Get an array of bots with optional query parameters
  query,        // [Optional] A search query
  page,         // [Optional, default 0] The page number to return
  limit,        // [Optional, default 50] The limit of bots to return per page
  authorId,     // [Optional] The author ID of the bots to return
  authorName,   // [Optional] The author name of the bots to return
  unverified,   // [Optional, default false] Whether to return unverified bots
  lib,          // [Optional] The library of the bots to return
  sort,         // [Optional] The field to sort by ("username", "id", "guildcount", "library", "author")
  order,        // [Optional] The order to sort by ("asc" or "desc")
 )
```
Returns a Promise that resolves to an array of BotData objects.

```typescript
getBot(         // Get information about a bot by its ID
  botId         // The ID of the bot to get information for
)
```
Returns a Promise that resolves to a Bot object.

```typescript
postStats(      // Update the stats for a bot
  token,        // The authorization token.
  botId         // The ID of the bot to update
  guildCount,   // The guild count for the bot
  shardCount,   // The shard count for the bot
)
```
Update bot stats for a given bot ID.

## Error Handling

All three functions may throw an error if there is a problem with the request or if the provided parameters are invalid. For example, getBots will throw an error if the limit parameter is less than 0 or greater than 100.

It is recommended to use try/catch blocks to handle errors when calling these functions.
