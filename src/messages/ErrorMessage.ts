import { MessageEmbed } from 'discord.js'

export function ErrorMessage(emoji: string, content: string) {
  return new MessageEmbed()
  .setColor('#ff3333')
  .setDescription(`${emoji} ${content}`)
}