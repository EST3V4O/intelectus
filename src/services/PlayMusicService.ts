import ytdl from 'ytdl-core-discord'

import { VideoSearchResult } from 'yt-search'
import { Client, Message } from "discord.js";
import { QueueService } from './QueueService';

export async function PlayMusicService(bot: Client, msg: Message, song: VideoSearchResult) {
  const queue = await QueueService({ bot, msg, song })

  const connection = await msg.member?.voice.channel?.join()

  const dispatcher = connection?.play(await ytdl(song.url), {
    type: 'opus'
  })

  if(queue.length > 0) {
    dispatcher?.on('finish', (i: string) => {
      queue.shift()
      PlayMusicService(bot, msg, queue[0])
    })
  }
}