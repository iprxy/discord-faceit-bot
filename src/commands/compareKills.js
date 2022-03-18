/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import embedPlayerGraph from '../modules/embedPlayerGraph.js';
import embedError from '../modules/embedError.js';
import generateChart from '../charts/generateChart.js';

export default async function compareKills(username, faceit) {
  try {
    const [nickname, opponentname] = username.split('+');

    const getLast20KillsByName = async (name) => {
      const userInfo = await faceit._getUserInfo(name);
      const userId = userInfo[0].id;
      const userMatchesList = await faceit.getMatchesList(userId);

      return userMatchesList
        .slice(0, 20)
        .reverse()
        .map((match, index) => ({ matchNumber: index + 1, killsCount: match.i6 }));
    };

    const userLast20Matches = await getLast20KillsByName(nickname);
    const opponentLast20Matches = await getLast20KillsByName(opponentname);

    const labels = userLast20Matches.map((item) => item.matchNumber);
    const dataset = [{
      label: nickname,
      data: userLast20Matches.map((item) => item.killsCount),
      fill: false,
      borderColor: 'green',
    }, {
      label: opponentname,
      data: opponentLast20Matches.map((item) => item.killsCount),
      fill: false,
      borderColor: 'blue',
    }];
    const chart = await generateChart(dataset, labels);

    return embedPlayerGraph(chart, username, 'kills count of last 20 matches');
  } catch (err) {
    return embedError(username);
  }
}
