import fs from 'fs'
import path from 'path'

import { Collection } from 'discord.js'
import { Command } from '../@types/Command'

export function GetCommandsService() {
  const commandsDir = path.join(__dirname, '../', './commands')
  const commandFiles = fs.readdirSync(commandsDir)


    const commands = new Collection<string, Command>()

    commandFiles.forEach(commandFile => {
        const command = require(`${commandsDir}/${commandFile}`) as Command

        commands.set(command.name, command)
    })

    return commands
}