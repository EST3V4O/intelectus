import { FindMusicsService } from "./FindMusicsService";

export async function GetMusicVideoIdService(videoId: string) {
  return await FindMusicsService({ videoId })
}