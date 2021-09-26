import { Client, Message } from "discord.js"

import { FindMusicsService } from "./FindMusicsService"

export async function GetMusicsService(bot: Client, msg: Message, args: string) {
  const isUrl = args.startsWith('http' || 'https')
  const isYoutube = args.includes('youtube')

  if(isUrl) {
    if(isYoutube) {
      const isVideoId = args.includes('v=')
      const isListId = args.includes('list=')
  
      if(isVideoId) {
        const [, videoId] = args.split('v=')
  
        await FindMusicsService({ videoId })
      }

      if(isListId) {
        const [, listId] = args.split('list=')
  
        await FindMusicsService({ listId })
      }

    }
  }

  await FindMusicsService({ query: args })

  // await FindMusicsService({ bot, msg, toFind: allArgs })

  // if(isUrl === 'http' || isUrl === 'https') {
  //   const [, videoId, listId] = allArgs.split('=')

  //   if(listId) {

  //   }

  //   if(videoId) {
  //     const result = await FindMusicsService({ bot, msg, type: 'videoId', toFind: videoId })

  //     console.log(result)
  //     // return result
  //   }

  // }
  // const [, , app] = allArgs.split('/')
  // const isYoutube = app.includes('youtube')

  // if(isYoutube) {
  //   const [, videoId, playlistId] = allArgs.split('=')

  //   console.log(videoId + ' | '  + playlistId)
  // }

  
}