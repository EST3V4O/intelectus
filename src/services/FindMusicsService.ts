import ytdlSearch from 'yt-search'

import { Client, Message } from "discord.js"

type FindMusicsServiceParams = {
  bot: Client,
  msg: Message,
  toFind: string;
  type: string;
}

export async function FindMusicsService({ bot, msg, toFind, type  }: FindMusicsServiceParams) {
  switch (type) {
    case 'query':
      return ytdlSearch({ query: toFind }, (err, result) => {
        console.log(result)
        return result
      })

    case 'videoId':
      let result
      ytdlSearch({ videoId: toFind }, (err, song) => {
        result = song
      })
      console.log(result)
      return result

    case 'listId':
      return ytdlSearch({ listId: toFind }, (err, result) => {
        console.log(result)
        return result
      })
  
    default:
      throw new Error('Missing type')
      break;
  }
}