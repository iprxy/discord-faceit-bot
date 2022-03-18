/* eslint-disable import/extensions */
import embedTogetherMatches from '../modules/embedTogetherMatches.js';
import embedError from '../modules/embedError.js';

export default async function (username, faceit) {
  try {
    const [nickname, opponentname] = username.split('+');
    const togetherMatches = await faceit.findOpponent(nickname, opponentname);

    console.log(togetherMatches);

    return embedTogetherMatches(nickname, opponentname, togetherMatches);
  } catch (err) {
    return embedError(username);
  }
}
