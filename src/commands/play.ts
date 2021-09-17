import ytdlSearch from 'yt-search'

import { Client, Message } from "discord.js";
import { PlayMusicService } from '../services/PlayMusicService';

async function execute(bot: Client, msg: Message, args: string[]) {
  const stringArgs = args.join(' ')

  ytdlSearch(stringArgs, (err, result) => {
    if(result && result.videos.length > 0) {
      const song = result.videos[0]
      PlayMusicService(bot, msg, song)
    }
  })
}

export = {
  name: 'play',
  help: 'play',
  execute,
}