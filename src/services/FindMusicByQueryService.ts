import { search } from 'yt-search'

export async function FindMusicByQueryService(query: string) {
  const result = await search({ query })

  return result
}