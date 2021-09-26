import ytdl from 'ytdl-core-discord'

import { Client, Message, Queue } from "discord.js";

export async function PlayMusicService(bot: Client, msg: Message, queue: Queue) {
  const guildId = msg.member?.guild.id || ''
  const voiceChannel = msg.member?.voice.channel

  if(!voiceChannel) {
    return msg.channel.send('Entry in a voice channel')
  }

  const connection = await voiceChannel?.join()

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