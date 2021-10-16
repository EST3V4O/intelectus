import { Client, Message } from "discord.js";
import { SuccessMessage } from "../messages/SuccessMessage";

async function execute(bot: Client, msg: Message, args: string[]) {
    const successMessage = SuccessMessage(':ping_pong:', 'Pong!')
    return msg.channel.send(successMessage)
}

export = {
    name: 'ping',
    emoji: ':ping_pong:',
    help: 'A simple ping-pong for test the bot',
    execute
}