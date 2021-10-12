import { Client, Message } from "discord.js";

async function execute(bot: Client, msg: Message, args: string[]) {
  const guildId = msg.guild?.id || ''
  const queue = bot.queues.get(guildId)

  if(!queue) {
    return msg.channel.send('Not have queue!')
  }
  
  queue.dispatcher?.pause()
}

export = {
  name: 'pause',
  help: 'pause',
  execute
}