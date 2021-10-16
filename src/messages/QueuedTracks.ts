import { MessageEmbed } from 'discord.js'

export function QueuedTracks(countMusics: number) {
  return new MessageEmbed()
  .setColor('#ee6f00')
  .setDescription(`Queued **${countMusics}** tracks`)
}
