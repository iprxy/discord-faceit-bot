export default function (username) {
  return {
    color: 16733440,
    title: 'Something went wrong :confused:',
    description:
        '**Why?**\n' +
        ':point_right: nickname error,\n' +
        ':point_right: faceit servers down,\n' +
        ':point_right: this user cannot play CS:GO,\n' +
        ':point_right: user stats is private,\n' +
        ':point_right: all was broken, we all die.\n\n',
    fields: [
      {
        name: 'Seach?',
        value: `send \`!search ${username}\` to find users`
      }
    ],
    footer: {
      text: 'Faceit Stats by github.com/iprxy'
    }
  }
}
