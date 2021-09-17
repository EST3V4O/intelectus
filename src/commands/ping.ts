import { Client, Message } from "discord.js";

async function execute(bot: Client, msg: Message, args: string[]) {
    return msg.channel.send('pong!')
}

export = {
    name: 'ping',
    help: 'ping pong',
    execute
}