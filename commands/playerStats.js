const Discord = require('discord.js')

const getPlayerStats = async (playerId, faceit) => {
  const playerInfo = await faceit.players.getPlayerDetails(playerId)
  if (playerInfo.games.csgo) {
      const csgoData = {
        nickname: playerInfo.nickname,
        avatar: playerInfo.avatar,
        country: playerInfo.country,
        elo: playerInfo.games.csgo.faceit_elo,
        level: playerInfo.games.csgo.skill_level
      }
      const csgoInfo = await faceit.players.getPlayerStats(playerId, 'csgo')
      const lifeTimeInfo = csgoInfo.lifetime
      const playerStats = {
          averageKD: +lifeTimeInfo['Average K/D Ratio'],
          lastFiveResults: lifeTimeInfo['Recent Results'].map(i => i === '0' ? '👎' : '👍').join(', '),
          totalMatches: +lifeTimeInfo.Matches,
          winsCount: +lifeTimeInfo.Wins,
          currentWinStreak: +lifeTimeInfo['Current Win Streak'],
          longestWinStreak: +lifeTimeInfo['Longest Win Streak'],
          winRate: +lifeTimeInfo['Win Rate %'],
          averageHeadshots: +lifeTimeInfo['Average Headshots %']
      }
      const statsToMessage = { ...csgoData, ...playerStats }
      return statsToMessage
  } else {
      return undefined
  }
}

const playerStats = async (msg, username, faceit) => {
  try {
    const faceitSearch = await faceit.search.searchPlayers(username)
    const { items } = faceitSearch

    const searchUser = items.filter(x => x.nickname.toLowerCase() === username.toLowerCase())
    const userData = searchUser.length ? searchUser : null
    const playerID = userData.length ? userData[0].player_id : null

    if(playerID) {
      const playerStats = await getPlayerStats(playerID, faceit)
      const showFire = playerStats.longestWinStreak === playerStats.currentWinStreak ? '🔥' : ''
      const embed = new Discord.MessageEmbed()
        .setColor('#ff5500')
        .setAuthor(`${playerStats.nickname}`, '', `https://faceit.com/en/players/${playerStats.nickname}`)
        .setThumbnail(playerStats.avatar)
        .setDescription(
          `**Country**: :flag_${playerStats.country}:\n` +
          `**Level**: ${playerStats.level} (${playerStats.elo} elo)\n` +
          `**K/D ratio**: ${playerStats.averageKD} **HS ratio**: ${playerStats.averageHeadshots}%\n` + 
          `**Longest winstreak**: ${playerStats.longestWinStreak} **Current**: ${playerStats.currentWinStreak} ${showFire}\n` +
          `**Matches**: ${playerStats.totalMatches}, **Wins**: ${playerStats.winsCount}, **Winrate:** ${playerStats.winRate}%`
        )
        .setFooter('Faceit Stats by github.com/iprxy')
      msg.reply(embed)
    }
  } catch (err) {
    const embed = new Discord.MessageEmbed()
    .setColor('#ff5500')
    .setTitle(`Something went wrong :confused:`)
    .setDescription(
      '**Why?**\n' +
      ':point_right: nickname error,\n' +
      ':point_right: faceit servers down,\n' +
      ':point_right: this user cannot play CS:GO,\n' +
      ':point_right: user stats is private,\n' +
      ':point_right: all was broken, we all die.\n\n'
    )
    .addField('Search?', `send \`/search ${username}\` to find users`)
    .setFooter('Faceit Stats by github.com/iprxy')
    msg.reply(embed)
  }
}

module.exports = playerStats