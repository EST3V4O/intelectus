import { MessageEmbed } from 'discord.js'

type MusicEmbedParams = {
  requestBy: string;
  title: string;
  url: string;
  thumbnail: string;
}

export function MusicEmbed({ title, url, thumbnail, requestBy }: MusicEmbedParams) {
  const message = new MessageEmbed({
    title: 'Now playing',
    description: `<a>${url}<a/> [@${requestBy}]`,
    thumbnail: { url: thumbnail },
  })

  return message
}