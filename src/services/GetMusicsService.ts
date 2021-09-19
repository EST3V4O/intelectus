import { Client, Message } from "discord.js"

import { FindMusicsService } from "./FindMusicsService"

export async function GetMusicsService(bot: Client, msg: Message, args: string[]) {
  const allArgs = args.join(' ')
  const [isUrl] = allArgs.split('://')

  if(isUrl === 'http' || isUrl === 'https') {
    const [, videoId, listId] = allArgs.split('=')

    if(listId) {

    }

    if(videoId) {
      const result = await FindMusicsService({ bot, msg, type: 'videoId', toFind: videoId })

      console.log(result)
      // return result
    }

  }
  // const [, , app] = allArgs.split('/')
  // const isYoutube = app.includes('youtube')

  // if(isYoutube) {
  //   const [, videoId, playlistId] = allArgs.split('=')

  //   console.log(videoId + ' | '  + playlistId)
  // }

  
}