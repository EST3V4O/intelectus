import { Client, Message, MessageEmbed } from "discord.js";

type CommandResult = {
  name: string;
  shortcut?: string;
  help: string;
  emoji: string;
  execute?: (bot: Client, msg: Message, args: string[]) => void;
}

async function execute(bot: Client, msg: Message, args: string[]){
  const commands = bot.commands

  const allHelpers = commands.map(command => {
    const objectCommand = { ...command } as CommandResult
    delete objectCommand.execute
    return { ...objectCommand }
  })

  const helpers = allHelpers.filter((helper, index) => {
    if(allHelpers.length === (index + 1)) return

    return helper.name !== allHelpers[index + 1].name
  })

  const helpMessage = new MessageEmbed()
  .setColor('#ee6f00')
  .setTitle('Help command')
  .setDescription('List of commands that can be executed. With the help of the shortcut and the parameters. Use prefix "**-**" before the command to execute. \n- Example: **-command ** ')

  helpers.forEach(({ name, help, shortcut, emoji }) => {
    helpMessage.addField(`${emoji} - ${name}`, `${help} ${ shortcut ? '\n- Shortcut: ` ' + shortcut + ' `' : '' }`)
  })

  return msg.channel.send(helpMessage)
}


export = {
  name: 'help',
  shortcut: 'h',
  emoji: ':grey_question:',
  help: 'List all commands with their help',
  execute,
}