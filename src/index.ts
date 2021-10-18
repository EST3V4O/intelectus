import 'dotenv/config'

import { Client } from 'discord.js'

import { GetCommandsService } from './services/GetCommandsService'

const bot = new Client()
bot.commands = GetCommandsService()
bot.queues = new Map()

bot.on('ready', async () => {
    console.log('Intelectus is running...')
    bot.user?.setActivity({ name: '-help', type: 'LISTENING' })
})

bot.on('message', async (msg) => {
    if(msg.author.bot) return
    if(!msg.content.startsWith(process.env.PREFIX || '')) return

    const args = msg.content.slice(process.env.PREFIX?.length).split(' ')
    const command = args.shift()?.toLocaleLowerCase().trim()

    try {
        const findCommand = bot.commands.get(command || '')

        await findCommand?.execute(bot, msg, args)
    } catch (error) {
        console.log(error)
    }
})

bot.login(process.env.TOKEN)