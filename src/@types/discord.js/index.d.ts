import { VideoMetadataResult, VideoSearchResult } from "yt-search"

declare module 'discord.js' {
    export type Command = {
        name: string;
        shortcut?: string;
        help: string;
        emoji?: string;
        execute: (bot: Client, msg: Message, args: string[]) => void;
    }

    export type Queue = {
        currentMusic: (VideoSearchResult | VideoMetadataResult)[];
        musics: (VideoSearchResult | VideoMetadataResult) [];
        dispatcher?: StreamDispatcher;
    }

    export interface Client {
        commands: Collection<string, Command>;
        queues: Map<string, Queue | undefined>;
    }
}