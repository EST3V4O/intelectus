import { Client, Message } from "discord.js";
import { ErrorMessage } from "../messages/ErrorMessage";
import { SuccessMessage } from "../messages/SuccessMessage";

async function execute(bot: Client, msg: Message, args: string[]) {
  const guildId = msg.guild?.id || ''
  const queue = bot.queues.get(guildId)

  if(!queue) {
    const errorMessage = ErrorMessage('Not have queue!' )
    return msg.channel.send(errorMessage)
  }
  
  queue.dispatcher?.pause()
  const successMessage = SuccessMessage(':pause_button:', 'Queue paused!')
  return msg.channel.send(successMessage)
}

export = {
  name: 'pause',
  emoji: ':stop_button:',
  help: 'Pause current server queue',
  execute
}