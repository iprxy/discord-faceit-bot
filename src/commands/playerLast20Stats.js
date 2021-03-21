import embedLast20Stats from '../modules/embedLast20Stats.js'
import embedError from '../modules/embedError.js'

export default async function (username, faceit) {
  try {
    const playerStats = await faceit.getLast20Stats(username)
    return embedLast20Stats(playerStats)
  } catch (err) {
    return embedError(username)
  }
}
