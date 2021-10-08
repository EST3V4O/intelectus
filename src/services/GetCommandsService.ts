import fs from 'fs'
import path from 'path'

import { Collection, Command } from 'discord.js'

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