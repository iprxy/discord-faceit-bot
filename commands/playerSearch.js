const Discord = require('discord.js')

const searchPlayer = async (msg, username, faceit) => {
  const search = await faceit.search.searchPlayers(username)
  if (search.items.length) {
    const { items } = search
    const searchResults = items.map(item => {
      item.games = item.games.filter(x => x.name === 'csgo')
      return item
    })
    const csgoResults = searchResults
      .filter(x => x.games.length !== 0)
      .map(item => `player: \`${item.nickname}\`, ${item.games[0].skill_level} lvl \`\`\`/stats ${item.nickname}\`\`\``).slice(0, 5)
    const embed = new Discord.MessageEmbed() 
      .setColor('#ff5500')
      .setTitle('Search results')
      .setDescription(csgoResults.join('\n'))
      .setFooter('Faceit Stats by github.com/iprxy')
    msg.reply(embed)
  } else {
    const embed = new Discord.MessageEmbed() 
      .setColor('#ff5500')
      .setDescription('No results found :tired_face:')
      .setFooter('Faceit Stats by github.com/iprxy')
    msg.reply(embed)
  }
}

module.exports = searchPlayer