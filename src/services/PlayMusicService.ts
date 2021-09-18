import ytdl from 'ytdl-core-discord'

import { VideoSearchResult } from 'yt-search'
import { Client, Message } from "discord.js";
import { Queue } from '../@types/Queue';

export async function PlayMusicService(bot: Client, msg: Message, queue: Queue) {
  const guildId = msg.member?.guild.id || ''
  const connection = await msg.member?.voice.channel?.join()

  if(connection && queue) {
    const dispatcher = connection.play(await ytdl(queue.currentMusic[0].url, {
      filter: 'audioonly', highWaterMark: 1 << 25
    }), {
      type: 'opus'
    })
  
    dispatcher.on('finish', () => {
      queue.currentMusic.shift()
      bot.queues.set(guildId, queue)
      if(queue.currentMusic.length > 0) {
          PlayMusicService(bot, msg, queue)
        }
    })
  }
}