import { MessageEmbed, User } from 'discord.js'

type AddedOnQueueParams = {
  requestBy?: User;
  title: string;
  url: string;
}

export function AddedOnQueue({ title, url, requestBy }: AddedOnQueueParams) {
  return new MessageEmbed()
  .setColor('#ee6f00')
  .setTitle('Added on queue')
  .setDescription(`[${title}](${url}) [${requestBy}]`)
}
