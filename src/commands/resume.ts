import { Client, Message } from "discord.js";
import { ErrorMessage } from "../messages/ErrorMessage";
import { SuccessMessage } from "../messages/SuccessMessage";

async function execute(bot: Client, msg: Message, args: string[]) {
  const guildId = msg.guild?.id || ''
  const queue = bot.queues.get(guildId)

  if(!queue) {
    const errorMessage = ErrorMessage(':no_entry_sign:', 'Not have queue!' )
    return msg.channel.send(errorMessage)
  }
  
  queue.dispatcher?.resume()
  const successMessage = SuccessMessage(':arrow_forward:', 'Queue resumed!')
  return msg.channel.send(successMessage)
}

export = {
  name: 'resume',
  emoji: ':pause_button:',
  help: 'Resume current server queue',
  execute
} 