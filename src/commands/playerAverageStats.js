import embedAverageStats from '../modules/embedAverageStats.js'
import embedError from '../modules/embedError.js'

export default async function (username, faceit) {
  try {
    const playerStats = await faceit.getAverageStats(username)
    return embedAverageStats(playerStats)
  } catch (err) {
    return embedError(username)
  }
}
