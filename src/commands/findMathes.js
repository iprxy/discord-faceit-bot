import embedTogetherMatches from '../modules/embedTogetherMatches.js'
import embedError from '../modules/embedError.js'

export default async function (username, faceit) {
  try {
    const [nickname, opponentname] = username.split(' ')
    const togetherMatches = await faceit.findOpponent(nickname, opponentname)
    return embedTogetherMatches(togetherMatches)
  } catch (err) {
    return embedError(username)
  }
}