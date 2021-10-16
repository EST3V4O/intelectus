import { Client, Message } from "discord.js";

async function execute(bot: Client, msg: Message, args: string[]) {
  const guildId = msg.member?.guild.id || ''
  const queue = bot.queues.get(guildId)

  if(!queue) {
    return msg.channel.send('Not have queue!')
  }

  queue.dispatcher?.destroy()
  bot.queues.set(guildId, undefined)

  return msg.channel.send('Cleared queue!')
}

export = {
  name: 'clear',
  help: 'clear',
  execute,
}