/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import embedPlayerGraph from '../modules/embedPlayerGraph.js';
import embedError from '../modules/embedError.js';
import generateChart from '../charts/generateChart.js';

export default async function last20Kills(username, faceit) {
  try {
    const userInfo = await faceit._getUserInfo(username);
    const userId = userInfo[0].id;
    const matchesList = await faceit.getMatchesList(userId);
    const last20Matches = matchesList
      .filter((x) => x.elo)
      .slice(0, 20)
      .reverse()
      .map((match, index) => ({ matchNumber: index + 1, killsCount: match.i6 }));

    const labels = last20Matches.map((item) => item.matchNumber);
    const dataset = [{
      label: 'Kills by match',
      data: last20Matches.map((item) => item.killsCount),
      fill: false,
      borderColor: '#EE5002',
    }];
    const chart = await generateChart(dataset, labels);

    return embedPlayerGraph(chart, username, 'kills count of last 20 matches');
  } catch (err) {
    return embedError(username);
  }
}
