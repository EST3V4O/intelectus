import { Client, Message } from "discord.js";

import { PlayMusicService } from '../services/PlayMusicService';
import { QueueService } from '../services/QueueService';
import { FindMusicByQueryService } from "../services/FindMusicByQueryService";
import { AddedOnQueue } from "../messages/AddedOnQueue";
import { GetMusicByPlaylistService } from "../services/GetMusicByPlaylistService";
import { FindMusicByVideoIdService } from "../services/FindMusicByVideoIdService";
import { NowPlaying } from "../messages/NowPlaying";
import { QueuedTracks } from "../messages/QueuedTracks";
import { ErrorMessage } from "../messages/ErrorMessage";

async function execute(bot: Client, msg: Message, args: string[]) {
  const guildId = msg.member?.guild.id || ''
  const allArgs = args.join(' ')
  const isUrl = allArgs.startsWith('http' || 'https')

  if(isUrl) {
    const isListId = allArgs.includes('list=')
    const isVideoId = allArgs.includes('v=')

    const queue = bot.queues.get(guildId)

    if(isListId) {
      const [, listId] = allArgs.split('list=')

      const musics = await Promise.all(await GetMusicByPlaylistService(listId))
      if(!musics) {
        const errorMessage = ErrorMessage(':no_entry_sign:', 'Could not found musics!')
        return msg.channel.send(errorMessage)
      }

      const queuedTracks = QueuedTracks(musics.length)
      
      if(!queue) {
        const queue = {
          currentMusic: musics,
          musics: musics
        }
        bot.queues.set(guildId, queue)
        await PlayMusicService(bot, msg)

        return msg.channel.send(queuedTracks)
      }

      const newQueue = {
        currentMusic: [...queue.currentMusic, ...musics],
        musics: [...queue.musics, ...musics]
      }
      bot.queues.set(guildId, newQueue)
      return msg.channel.send(queuedTracks)
    }

    if(isVideoId) {
      const [, videoId] = allArgs.split('v=')

      const music = await FindMusicByVideoIdService(videoId)
      if(!music) {
        const errorMessage = ErrorMessage(':no_entry_sign:', 'Could not found music!')
        return msg.channel.send(errorMessage)
      }
      
      if(!queue) {
        const nowPlaying = NowPlaying({
          title: music.title,
          url: music.url,
          requestBy: msg.member?.user,
        })
        await QueueService({ bot, msg, song: music })
        await PlayMusicService(bot, msg)

        return msg.channel.send(nowPlaying)
      }
      
      const addedOnQueue = AddedOnQueue({
        title: music.title,
        url: music.url,
        requestBy: msg.member?.user,
      })
      await QueueService({ bot, msg, song: music })
      
      return msg.channel.send(addedOnQueue)
    }

    const errorMessage = ErrorMessage(':no_entry_sign:', 'Could not found url!')
    return msg.channel.send(errorMessage)
  }

  const music = (await FindMusicByQueryService(allArgs)).videos[0]
  if(!music) {
    const errorMessage = ErrorMessage(':no_entry_sign:', 'Could not found music!')
    return msg.channel.send(errorMessage)
  }

  const queue = bot.queues.get(guildId)
  
  if(!queue) {
    const nowPlaying = NowPlaying({
      title: music.title,
      url: music.url,
      requestBy: msg.member?.user,
    })
    await QueueService({ bot, msg, song: music })
    await PlayMusicService(bot, msg)

    return msg.channel.send(nowPlaying)
  }

  const addedOnQueue = AddedOnQueue({
    title: music.title,
    url: music.url,
    requestBy: msg.member?.user,
  })
  await QueueService({ bot, msg, song: music })

  return msg.channel.send(addedOnQueue)
}

export = {
  name: 'play',
  shortcut: 'p',
  emoji: ':arrow_forward:',
  help: 'Play a song or playlist, currently searching **Youtube** only.\n - Args: ` query ` or ` url ` \n - Examples: **-play music** | **-play url**',
  execute,
}