import { Client, Message } from "discord.js";

export type Command = {
    name: string;
    help: string;
    execute: (bot: Client, msg: Message, args: string[]) => void;
}