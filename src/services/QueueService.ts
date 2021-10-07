import { Client, Message } from 'discord.js'
import { VideoSearchResult, SearchResult, VideoMetadataResult } from 'yt-search'

type QueueServiceParams = {
  bot: Client;
  msg: Message;
  song: VideoSearchResult | VideoMetadataResult;
}

export async function QueueService({ bot, msg, song }: QueueServiceParams) {
  const guildId = msg.member?.guild.id || ''

  const currentQueue = bot.queues.get(guildId)
  
  if(!currentQueue) {
    const queue = {
      musics: [song],
      currentMusic: [song]
    }
    bot.queues.set(guildId, queue)
    return queue
  } else {
    currentQueue.musics.push(song)
    currentQueue.currentMusic.push(song)
    bot.queues.set(guildId, currentQueue)
  }
  
  return currentQueue
}