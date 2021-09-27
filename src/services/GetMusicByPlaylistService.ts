import { SearchResult } from "yt-search";

import { FindMusicsService } from "./FindMusicsService";
import { GetMusicVideoIdService } from "./GetMusicByVideoIdService";

export async function GetMusicByPlaylistService(listId: string) {
  const playlist = (await FindMusicsService({ listId })).videos.map(async music => {
    return await GetMusicVideoIdService(music.videoId)
  })

  return playlist
}