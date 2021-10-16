import { MessageEmbed } from 'discord.js'

export function SuccessMessage(emoji: string, content: string) {
  return new MessageEmbed()
  .setColor('#4BB543')
  .setDescription(`${emoji} ${content}`)
}