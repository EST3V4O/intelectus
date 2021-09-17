import { Command } from "../Command";
import { Queue } from "../Queue";

declare module 'discord.js' {
    export interface Client {
        commands: Collection<string, Command>;
        // queues: Map<string, Queue[]>;
        queues: any;
    }
}