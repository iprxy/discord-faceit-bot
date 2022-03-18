/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

export default function calculateStatsByMonths(matchesList, type) {
  const playerMatchesStats = matchesList
    .map((match) => ({
      value: Number(match[type]),
      date: new Date(match.date),
    }))
    .filter((x) => x.value)
    .sort((a, b) => a.date - b.date);

  const groupedByYear = _.groupBy(playerMatchesStats, ({
    date,
  }) => new Date(date).getFullYear());

  const groupedByMonth = Object.values(groupedByYear)
    .map((item) => _.groupBy(item, ({
      date,
    }) => new Date(date).getMonth()));

  const avgValueByMonth = Object.values(groupedByMonth)
    .map((i) => Object.values(i))
    .map((item) => item.map((x) => Math.ceil(_.mean(x.map((match) => match.value)))));

  const yearsList = Object.keys(groupedByYear);
  const monthsList = groupedByMonth.map((i) => Object.keys(i));

  const calculatedByMonths = yearsList
    .map((year, i) => ({
      year,
      months: monthsList[i],
      avgValue: avgValueByMonth[i],
    }))
    .map((item) => {
      const {
        year,
        months,
        avgValue,
      } = item;
      return months
        .map((month, i) => ({
          year: Number(year),
          month: Number(month) + 1,
          avgValue: avgValue[i],
        }));
    }).flat();

  return calculatedByMonths;
}
