import embedSearch from '../modules/embedSearch.js'
import embedError from '../modules/embedError.js'

export default async function (username, faceit) {
  try {
    const users = await faceit.searchCSGOUsers(username)
    return embedSearch(users)
  } catch (err) {
    return embedError(username)
  }
}
