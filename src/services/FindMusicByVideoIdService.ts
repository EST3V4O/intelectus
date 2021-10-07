import { search } from 'yt-search'

export async function FindMusicByVideoIdService(videoId: string) {
  const result = await search({ videoId })

  return result
}