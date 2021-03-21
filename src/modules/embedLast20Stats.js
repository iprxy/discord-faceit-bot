export default function (playerStats) {
  const {
    nickname,
    level,
    country,
    avatar,
    elo,
    averageKDRatio,
    averageKRRatio,
    averageHeadshots,
    averageKills,
    totalTripleKills,
    totalQuadroKills,
    totalPentaKills
  } = playerStats
  return {
    color: 16733440,
    author: {
      name: nickname,
      icon_url: `https://raw.githubusercontent.com/iprxy/discord-faceit-bot/master/assets/${level}.png`,
      url: `https://faceit.com/en/players/${nickname}`
    },
    description:
        `**Country**: :flag_${country}:\n` +
        `**Level**: ${level} (${elo} elo)\n\n` +
        'Average stats\n' +
        `**K/D**: ${averageKDRatio}, **Avg. kills**: ${averageKills}, **HS Ratio**: ${averageHeadshots}%\n` +
        `**K/R**: ${averageKRRatio}\n\n` +
        'Total stats\n' +
        `**Triple**: ${totalTripleKills}, **Quadro**: ${totalQuadroKills}, **ACEs**: ${totalPentaKills}`,
    thumbnail: { url: avatar },
    timestamp: new Date(),
    footer: {
      text: 'Last 20 stats | React this message to update info\n' +
              'Faceit Stats by github.com/iprxy'
    }
  }
}
