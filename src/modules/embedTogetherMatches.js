export default function (username, opponentname,togetherMatches) {
  const resultString = `**${username}** and **${opponentname}** played **${togetherMatches.length}** matches together`
  let results
  if (togetherMatches.length > 10) {
    results = `${resultString}, list of last 10 matches:\n` + 
      togetherMatches.map(item => `[${item}](https://www.faceit.com/ru/csgo/room/'${item} '')`).slice(0, 10).join('\n')
  } else if (!togetherMatches.length) {
    results =  `${nickname} never played with ${opponentname}`
  } else {
    results = `${resultString}:\n` + 
      togetherMatches.map(item => `[${item}](https://www.faceit.com/ru/csgo/room/'${item} '')`).slice(0, 10).join('\n')
  }
  
    return {
      color: 16733440,
      title: 'Matches',
      description: results,
      footer: {
        text: 'Faceit Stats by github.com/iprxy'
      }
    }
  }
  