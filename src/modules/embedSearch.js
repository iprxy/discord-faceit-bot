/* eslint-disable no-param-reassign */
export default function (searchResults) {
  searchResults = searchResults
    .map((item) => `player: \`${item.nickname}\`, ${item.games[0].skill_level} lvl \`\`\`!stats ${item.nickname}\`\`\``)
    .slice(0, 5);

  return {
    color: 16733440,
    title: 'Search results',
    description: searchResults.join('\n'),
    footer: {
      text: 'Faceit Stats by github.com/iprxy',
    },
  };
}
