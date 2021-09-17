import 'dotenv/config'

import { Client, Collection } from 'discord.js'
import { getCommands } from './commands'

const bot = new Client()
bot.commands = getCommands()

bot.on('ready', async () => {
    console.log('Umbrionm is running...')
    bot.user?.setActivity('discor.js', { type: 'LISTENING' })
})

bot.on('message', async (msg) => {
    if(msg.author.bot) return
    if(!msg.content.startsWith(process.env.PREFIX || '')) return

    const args = msg.content.slice(process.env.PREFIX?.length).split(' ')
    const command = args.shift()?.toLocaleLowerCase().trim()

    bot.commands.get(command || '')?.execute(bot, msg, args)
})

bot.login(process.env.TOKEN)