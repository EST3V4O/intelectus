import { StreamDispatcher, VoiceConnection } from 'discord.js'
import ytdlSearch from 'yt-search'

export type Queue = {
  musics: ytdlSearch.VideoSearchResult[];
  connection: VoiceConnection;
  dispatcher: StreamDispatcher;
}