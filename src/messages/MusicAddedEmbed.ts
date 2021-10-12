import { MessageEmbed, User } from 'discord.js'

type MusicAddedEmbedParams = {
  requestBy?: User;
  title: string;
  url: string;
  thumbnail: string;
}

export function MusicAddedEmbed({ title, url, thumbnail, requestBy }: MusicAddedEmbedParams) {
  return new MessageEmbed()
  .setTitle('Added on queue')
  .setDescription(`[${title}](${url}) [${requestBy}]`)
  .setThumbnail(thumbnail)
}
