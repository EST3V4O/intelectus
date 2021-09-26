import { VideoSearchResult } from 'yt-search'

declare module 'discord.js' {
    export type Command = {
        name: string;
        help: string;
        execute: (bot: Client, msg: Message, args: string[]) => void;
    }

    export type Queue = {
        currentMusic: VideoSearchResult[],
        musics: VideoSearchResult[],
    }

    export interface Client {
        commands: Collection<string, Command>;
        queues: Map<string, Queue>;
    }
}