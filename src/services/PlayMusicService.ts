import ytdl from 'ytdl-core-discord'

import { Client, Message } from "discord.js";
import { NowPlaying } from '../messages/NowPlaying';

export async function PlayMusicService(bot: Client, msg: Message) {
  const guildId = msg.guild?.id || ''
  const voiceChannel = msg.member?.voice.channel
  const queue = bot.queues.get(guildId)

  const connection = await voiceChannel?.join()

  if(connection && queue) {
    queue.dispatcher = connection.play(await ytdl(queue.currentMusic[0].url, {
      filter: 'audioonly',
    }), {
      type: 'opus'
    })

    queue.dispatcher.on('finish', () => {
      queue.currentMusic.shift()
      bot.queues.set(guildId, queue)

      if(queue.currentMusic.length > 0) {
        PlayMusicService(bot, msg)

        const music = queue.currentMusic[0]
        const nowPlaying = NowPlaying({
          title: music.title,
          url: music.url,
          requestBy: msg.member?.user
        })
        
        return msg.channel.send(nowPlaying)
      }

      if(queue.currentMusic.length === 0) {
        bot.queues.set(guildId, undefined)
      }
    })
  }
}