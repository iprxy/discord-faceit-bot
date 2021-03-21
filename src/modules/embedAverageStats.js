export default function (playerStats, title) {
  const {
    nickname,
    avatar,
    country,
    level,
    elo,
    averageKills,
    averageKDRatio,
    winRate,
    averageHeadshots,
    averageKRRatio,
    totalMatches,
    totalWins,
    totalKills,
    totalDeaths,
    totalAssists,
    totalMVPs,
    totalRounds,
    totalHeadshots,
    totalTripleKills,
    totalQuadroKills,
    totalPentaKills,
    recentResults,
    currentWinstreak,
    longestWinstreak
  } = playerStats
  return {
    color: 16733440,
    title: title,
    author: {
      name: nickname,
      icon_url: `https://raw.githubusercontent.com/iprxy/discord-faceit-bot/master/assets/${level}.png`,
      url: `https://faceit.com/en/players/${nickname}`
    },
    description:
          `**Country**: :flag_${country}:\n` +
          `**Level**: ${level} (${elo} elo)\n\n` +
          'Matches\n' +
          `**Total matches**: ${totalMatches}, **Wins**: ${totalWins}, **Winrate**: ${winRate}%\n` +
          `**Current winstreak** ${currentWinstreak}, **Longest winstreak**: ${longestWinstreak}\n` +
          `**Recent results**: ${recentResults}\n\n` +
          'Average stats\n' +
          `**K/D**: ${averageKDRatio}, **Avg. kills**: ${averageKills}, **HS Ratio**: ${averageHeadshots}%\n` +
          `**K/R**: ${averageKRRatio}\n\n` +
          'Total stats\n' +
          `**Kills**: ${totalKills}, **Deaths**: ${totalDeaths}, **Assists**: ${totalAssists}\n` +
          `**Headshots**: ${totalHeadshots}, **Rounds**: ${totalRounds}, **MVPs**: ${totalMVPs}\n` +
          `**Triple**: ${totalTripleKills}, **Quadro**: ${totalQuadroKills}, **ACEs**: ${totalPentaKills}`,
    thumbnail: { url: avatar },
    timestamp: new Date(),
    footer: {
      text: 'Average Stats | React this message to update info\n' +
                'Faceit Stats by github.com/iprxy'
    }
  }
}
