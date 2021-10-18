import { Client, Message, MessageEmbed } from "discord.js"
import { ErrorMessage } from "../messages/ErrorMessage"

async function execute(bot: Client, msg: Message, args: string[]) {
  const guildId = msg.member?.guild.id || ''
  const queue = bot.queues.get(guildId)

  if(!queue) {
    const errorMessage = ErrorMessage('Not have queue!' )
    return msg.channel.send(errorMessage)
  }

  const queueMessage = new MessageEmbed()
  .setTitle('Musics on queue')
  .setColor('#ee6f00')

  let description = ''

  queue.musics.forEach(({ title, url  }) => {
    description += `\n[${title}](${url})`
  })

  queueMessage.setDescription(description)

  return msg.channel.send(queueMessage)
}

export = {
  name: 'queue',
  emoji: ':musical_note:',
  help: 'List musics on queue',
  execute
}