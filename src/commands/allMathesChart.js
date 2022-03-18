/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import embedPlayerGraph from '../modules/embedPlayerGraph.js';
import calculateStatsByMonths from '../utils/calculateStatsByMonths.js';
import embedError from '../modules/embedError.js';
import generateChart from '../charts/generateChart.js';

export default async function allMatchesChart(username, faceit) {
  try {
    const userInfo = await faceit._getUserInfo(username);
    const userId = userInfo[0].id;
    const matchesList = await faceit.getMatchesList(userId);
    const matchesData = calculateStatsByMonths(matchesList, 'elo');

    const labels = matchesData.map((item) => `${item.year}-${item.month}`);
    const dataset = [{
      label: 'Average Elo',
      data: matchesData.map((item) => item.avgValue),
      fill: false,
      borderColor: '#EE5002',
    }];
    const chart = await generateChart(dataset, labels);

    return embedPlayerGraph(chart, username, 'Average Elo');
  } catch (err) {
    return embedError(username);
  }
}
