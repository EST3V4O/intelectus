import { search } from 'yt-search'

import { Client, Message } from "discord.js"

type SearchOptions = {
  query?: string;
  videoId?: string;
  listId?:string;
}

type FindMusicsServiceParams = {
  bot: Client;
  msg: Message;
  toFind: string;
}

export async function FindMusicsService({ bot, toFind  }: FindMusicsServiceParams) {
  const oi = await search('adestrador de madeon')

  console.log(oi.all[0])
}