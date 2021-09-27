import { Client, Message } from "discord.js";

import { PlayMusicService } from '../services/PlayMusicService';
import { QueueService } from '../services/QueueService';
import { GetMusicVideoIdService } from "../services/GetMusicByVideoIdService";
import { GetMusicByPlaylistService } from "../services/GetMusicByPlaylistService";
import { FindMusicsService } from "../services/FindMusicsService";

async function execute(bot: Client, msg: Message, args: string[]) {
  const guildId = msg.member?.guild.id || ''
  const allArgs = args.join(' ')
  const isUrl = allArgs.startsWith('http' || 'https')

  if(isUrl) {
    const isListId = allArgs.includes('list=')
    const isVideoId = allArgs.includes('v=')

      if(isListId) {
        const [, listId] = allArgs.split('list=')
  
        const playlist = await GetMusicByPlaylistService(listId)

        const queue = bot.queues.get(guildId)
        
        if(!queue) {
          playlist.forEach(async (music, index) => {
            const video = await music
            await QueueService({ bot, msg, song: video })
            
            if(playlist.length === (index + 1)) {
              const queue = bot.queues.get(guildId)
              if(queue) {
                PlayMusicService(bot, msg, queue)
              }
            }
          })
          return
        }

        playlist.forEach(async (music) => {
          const video = await music
          await QueueService({ bot, msg, song: video })
        })

        return
      }

      if(isVideoId) {
        const [, videoId] = allArgs.split('v=')
  
        const video = await GetMusicVideoIdService(videoId)

        const queue = bot.queues.get(guildId)

        if(!queue) {
          const queue = await QueueService({ bot, msg, song: video })
          PlayMusicService(bot, msg, queue)
          return
        }

        await QueueService({ bot, msg, song: video })
        return
      }
  }

  const music = (await FindMusicsService({ query: allArgs })).videos[0]
  const queue = bot.queues.get(guildId)
  
  if(!queue) {
    const queue = await QueueService({ bot, msg, song: music })
    PlayMusicService(bot, msg, queue)
    return
  }

  await QueueService({ bot, msg, song: music })
}

export = {
  name: 'play',
  help: 'play',
  execute,
}