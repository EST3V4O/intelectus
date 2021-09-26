import { search } from 'yt-search'

type SearchOptions = {
  query?: string;
  videoId?: string;
  listId?:string;
}

export async function FindMusicsService(options: SearchOptions) {
  const result = await search(options)

  console.log(result)
}