import { MessageEmbed, User } from 'discord.js'

type NowPlayingParams = {
  requestBy?: User;
  title: string;
  url: string;
}

export function NowPlaying({ title, url, requestBy }: NowPlayingParams) {
  return new MessageEmbed()
  .setColor('#ee6f00')
  .setTitle('Now playing')
  .setDescription(`[${title}](${url}) [${requestBy}]`)
}
