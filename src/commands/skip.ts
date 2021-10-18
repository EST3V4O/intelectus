import { Client, Message } from "discord.js";
import { ErrorMessage } from "../messages/ErrorMessage";
import { NowPlaying } from "../messages/NowPlaying";
import { PlayMusicService } from "../services/PlayMusicService";

async function execute(bot: Client, msg: Message, args: string[]) {
  const guildId = msg.member?.guild.id || ''
  const queue = bot.queues.get(guildId)

  if(!queue) {
    const errorMessage = ErrorMessage('Not have queue!' )
    return msg.channel.send(errorMessage)
  }

  queue.currentMusic.shift()
  bot.queues.set(guildId, queue)

  if(queue.currentMusic.length === 0) {
    const errorMessage = ErrorMessage('Not have music after that!')
    return msg.channel.send(errorMessage)
  }

  await PlayMusicService(bot, msg)

  const music = queue.currentMusic[0]
  const nowPlaying = NowPlaying({
    title: music?.title,
    url: music?.url,
    requestBy: msg.member?.user
  })

  return msg.channel.send(nowPlaying)
}

export = {
  name: 'skip', 
  emoji: ':fast_forward:',
  help: 'Skip to the next song on queue',
  execute,
}