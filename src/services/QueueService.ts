
import { Client, Message } from 'discord.js'
import { VideoSearchResult } from 'yt-search'

type QueueServiceParams = {
  bot: Client;
  msg: Message;
  song: VideoSearchResult
}

export async function QueueService({ bot, msg, song }: QueueServiceParams) {
  const guildId = msg.member?.guild.id || ''

  let queue = bot.queues.get(guildId)

  if(!queue) {
    queue = [song]
    bot.queues.set(guildId, queue)
  } else {
    queue.push(song)
    bot.queues.set(guildId, queue)
  }

  return queue
}