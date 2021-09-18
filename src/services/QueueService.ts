
import { Client, Message } from 'discord.js'
import { VideoSearchResult } from 'yt-search'
import { Queue } from '../@types/Queue'

type QueueServiceParams = {
  bot: Client;
  msg: Message;
  song: VideoSearchResult
}

export async function QueueService({ bot, msg, song }: QueueServiceParams) {
  const guildId = msg.member?.guild.id || ''

  let currentQueue = bot.queues.get(guildId)
  
  if(!currentQueue) {
    const queue = {
      musics: [song],
      currentMusic: [song]
    } as Queue
    bot.queues.set(guildId, queue)
    return queue
  } else {
    currentQueue.musics.push(song)
    currentQueue.currentMusic.push(song)
    bot.queues.set(guildId, currentQueue)
  }
  
  return currentQueue
}