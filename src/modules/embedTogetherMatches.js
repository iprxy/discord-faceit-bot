export default function (matchLinks) {
    searchResults = matchLinks
      .map(item => `${item}`).join('\n')
      .slice(0, 10)
  
    return {
      color: 16733440,
      title: 'Matches',
      description: searchResults.join('\n'),
      footer: {
        text: 'Faceit Stats by github.com/iprxy'
      }
    }
  }
  