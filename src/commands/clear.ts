import { Client, Message } from "discord.js";
import { ErrorMessage } from "../messages/ErrorMessage";
import { SuccessMessage } from "../messages/SuccessMessage";

async function execute(bot: Client, msg: Message, args: string[]) {
  const guildId = msg.member?.guild.id || ''
  const queue = bot.queues.get(guildId)

  if(!queue) {
    const errorMessage = ErrorMessage(':no_entry_sign:', 'Not have queue!' )
    return msg.channel.send(errorMessage)
  }

  queue.dispatcher?.destroy()
  bot.queues.set(guildId, undefined)

  const successMessage = SuccessMessage(':broom:', 'Cleared queue!')
  return msg.channel.send(successMessage)
}

export = {
  name: 'clear',
  emoji: ':broom:',
  help: 'Clear the server queue',
  execute,
}