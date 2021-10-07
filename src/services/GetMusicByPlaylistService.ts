
import { FindMusicByListIdService } from "./FindMusicByListIdService"
import { FindMusicByVideoIdService } from "./FindMusicByVideoIdService"

export async function GetMusicByPlaylistService(listId: string) {
  const playlist = (await FindMusicByListIdService(listId)).videos.map(async music => {
    return await FindMusicByVideoIdService(music.videoId)
  })

  return playlist
}