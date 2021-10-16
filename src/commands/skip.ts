import { Client, Message } from "discord.js";
import { NowPlaying } from "../messages/NowPlaying";
import { PlayMusicService } from "../services/PlayMusicService";

async function execute(bot: Client, msg: Message, args: string[]) {
  const guildId = msg.member?.guild.id || ''
  const queue = bot.queues.get(guildId)

  if(!queue) {
    return msg.channel.send('Not have queue')
  }

  queue.currentMusic.shift()
  bot.queues.set(guildId, queue)
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
  help: 'skip',
  execute,
}