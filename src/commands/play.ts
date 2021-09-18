import ytdlSearch from 'yt-search'

import { Client, Message } from "discord.js";
import { PlayMusicService } from '../services/PlayMusicService';
import { QueueService } from '../services/QueueService';

async function execute(bot: Client, msg: Message, args: string[]) {
  const stringArgs = args.join(' ')

  ytdlSearch(stringArgs, async (err, result) => {
    if(err) {
      console.log(err)
    }

    if(result && result.videos.length > 0) {
      const song = result.videos[0]

      const queue = await QueueService({ bot, msg, song })
      PlayMusicService(bot, msg, queue)
    }
  })
}

export = {
  name: 'play',
  help: 'play',
  execute,
}