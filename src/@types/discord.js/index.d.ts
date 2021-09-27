import { SearchResult, VideoSearchResult } from "yt-search"

declare module 'discord.js' {
    export type Command = {
        name: string;
        help: string;
        execute: (bot: Client, msg: Message, args: string[]) => void;
    }

    export type Queue = {
        currentMusic: (VideoSearchResult | SearchResult)[];
        musics: (VideoSearchResult | SearchResult)[];
    }

    export interface Client {
        commands: Collection<string, Command>;
        queues: Map<string, Queue>;
    }
}