import ytdl from 'ytdl-core-discord'

import { Client, Message, Queue } from "discord.js";
import { MusicEmbed } from '../messages/MusicEmbed';

export async function PlayMusicService(bot: Client, msg: Message, queue: Queue) {
  const guildId = msg.guild?.id || ''
  const voiceChannel = msg.member?.voice.channel

  if(!voiceChannel) {
    return msg.channel.send('Entry in a voice channel')
  }

  const connection = await voiceChannel?.join()

  if(connection && queue) {
    queue.dispatcher = connection.play(await ytdl(queue.currentMusic[0].url, {
      filter: 'audioonly',
    }), {
      type: 'opus'
    })

    bot.queues.set(guildId, queue)

    queue.dispatcher.on('finish', () => {
      queue.currentMusic.shift()
      bot.queues.set(guildId, queue)

      if(queue.currentMusic.length > 0) {
        PlayMusicService(bot, msg, queue)

        const music = queue.currentMusic[0]
        const musicEmbed = MusicEmbed({
          title: music.title,
          url: music.url,
          thumbnail: music.thumbnail,
          requestBy: msg.member?.user
        })
        
        return msg.channel.send({ embed: musicEmbed })
      }
    })

    queue.dispatcher.on('speaking', () => {
      console.log('speak')
    })
  }
}