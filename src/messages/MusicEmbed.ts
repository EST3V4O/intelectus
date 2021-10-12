import { MessageEmbed, User } from 'discord.js'

type MusicEmbedParams = {
  requestBy?: User;
  title: string;
  url: string;
  thumbnail: string;
}

export function MusicEmbed({ title, url, thumbnail, requestBy }: MusicEmbedParams) {
  return new MessageEmbed()
  .setTitle('Now playing')
  .setDescription(`[${title}](${url}) [${requestBy}]`)
  .setThumbnail(thumbnail)
}
