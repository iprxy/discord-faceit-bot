import playerAverageStats from '../commands/playerAverageStats.js'
import playerLast20Stats from '../commands/playerLast20Stats.js'
import searchPlayer from '../commands/playerSearch.js'
import findMathes from '../commands/findMathes.js'

const COMMAND_PATTERN = /!(.+) (.+)/

const checkCommands = (content) => {
  const isCommand = COMMAND_PATTERN.test(content)
  const commands = isCommand ? content.match(COMMAND_PATTERN).slice(1, 3) : null
  return commands
}

export default async function (msg, faceit) {
  const { content } = msg
  const checkedCommands = checkCommands(content)
  if (checkedCommands && !msg.author.bot) {
    const [command, nickname] = checkedCommands
    let stats
    switch (command) {
      case 'stats':
        stats = await playerAverageStats(nickname, faceit)
        msg.reply({ embed: stats })
        break
      case 'last20':
        stats = await playerLast20Stats(nickname, faceit)
        msg.reply({ embed: stats })
        break
      case 'search':
        stats = await searchPlayer(nickname, faceit)
        msg.reply({
          embed: stats
        })
        break
      case 'find':
        stats = await findMathes(nickname, faceit)
        msg.reply({embed: stats})
        break
    }
  }
}
