import { MessageEmbed } from 'discord.js'

export function ErrorMessage(content: string) {
  return new MessageEmbed()
  .setColor('#ff3333')
  .setDescription(`:no_entry_sign: ${content}`)
}