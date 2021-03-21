import playerAverageStats from '../commands/playerAverageStats.js'
import playerLast20Stats from '../commands/playerLast20Stats.js'

const BOT_ID = '765642102800646146'

export default async function reactionController (reaction, faceit) {
  const { message } = reaction

  if (message.author.id === BOT_ID && message.embeds[0].author) {
    const { author, footer } = message.embeds[0]
    const findCollection = await message.channel.messages.fetch({
      around: message.id,
      limit: 1
    })
    const fetchedMsg = findCollection.first()

    let stats

    if (footer.text.includes('Average Stats')) {
      stats = await playerAverageStats(author.name, faceit)
    } else {
      stats = await playerLast20Stats(author.name, faceit)
    }

    fetchedMsg.edit({ embed: stats })
  }
}
