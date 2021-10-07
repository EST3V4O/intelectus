import { search } from 'yt-search'

export async function FindMusicByListIdService(listId: string) {
  const result = await search({ listId })

  return result
}