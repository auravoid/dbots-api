export type BotData = {
  count: number;
  limit: number;
  page: number;
  bots: Bot[];
};

export type Bot = {
  userId: bigint;
  clientId: bigint;
  username: string;
  discriminator: number;
  avatarstring: string;
  coOwners: Owner[] | null;
  prefix: string;
  helpCommand: string | null;
  libraryName: string;
  website: string | null;
  supportInvite: string | null;
  botInvite: string;
  shortDescription: string;
  longDescription: string | null;
  openSource: string | null;
  shardCount: number;
  guildCount: number;
  verified: boolean;
  slashCommandsOnly: boolean;
  online: boolean;
  inGuild: boolean;
  owner: Owner;
  addedDate: Date;
  status: "online" | "idle" | "dnd" | "offline" | null;
};

export type Owner = {
  username: string;
  discriminator: number;
  userId: bigint;
};

export type BotStats = {
  guildCount: number;
  shardCount: number;
};
