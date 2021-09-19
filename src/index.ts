import 'dotenv/config'

import { Client } from 'discord.js'

import { GetCommandsService } from './services/GetCommandsService'

const bot = new Client()
bot.commands = GetCommandsService()
bot.queues = new Map()

bot.on('ready', async () => {
    console.log('Umbreonm is running...')
    bot.user?.setActivity({ name: '-help', type: 'LISTENING' })
})

bot.on('message', async (msg) => {
    if(msg.author.bot) return
    if(!msg.content.startsWith(process.env.PREFIX || '')) return

    const args = msg.content.slice(process.env.PREFIX?.length).split(' ')
    const command = args.shift()?.toLocaleLowerCase().trim()

    bot.commands.get(command || '')?.execute(bot, msg, args)
})

bot.login(process.env.TOKEN)