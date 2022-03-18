export default function (playerGraph, username, description) {
  return {
    color: 16733440,
    title: `Chart of **${description}** for player **${username}**`,
    image: {
      url: playerGraph,
    },
    footer: {
      text: 'Faceit Stats by github.com/iprxy',
    },
  };
}
