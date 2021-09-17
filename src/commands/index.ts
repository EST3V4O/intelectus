import { Collection } from 'discord.js'
import fs from 'fs'

import { Command } from '../types/Command'

export function getCommands() {
    const allCommandFiles = fs.readdirSync(__dirname)

    const commandsFiles = allCommandFiles.filter(commandFile => commandFile !== 'index.ts')

    const commands = new Collection<string, Command>()

    commandsFiles.forEach(commandFile => {
        const command = require(`./${commandFile}`) as Command

        commands.set(command.name, command)
    })

    return commands
}