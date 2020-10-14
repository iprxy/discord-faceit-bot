const playerStats = require('./playerStats')
const searchPlayer = require('./playerSearch')

const checkCommands = (content) => {
  const commandPattern = /\/(.+) (.+)/
  const isCommand = commandPattern.test(content)
  const commands = isCommand ? content.match(commandPattern).slice(1,3) : null
  return commands
}

const commands = async (msg, faceit) => {
  const { content } = msg
  const checkedCommands = checkCommands(content)
  if (checkedCommands && !msg.author.bot) {
    const [command, nickname] = checkedCommands
    switch(command) {
      case 'stats':
        playerStats(msg, nickname, faceit)
        break
      case 'search':
        searchPlayer(msg, nickname, faceit)
        break
    }
  }
}

module.exports = commands
