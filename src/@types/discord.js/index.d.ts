import { Command } from "../../types/command";

declare module 'discord.js' {
    export interface Client {
        commands: Collection<string, Command>;
    }
}