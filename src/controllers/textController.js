/* eslint-disable import/extensions */
import playerAverageStats from '../commands/playerAverageStats.js';
import playerLast20Stats from '../commands/playerLast20Stats.js';
import searchPlayer from '../commands/playerSearch.js';
import findMathes from '../commands/findMathes.js';
import allMatchesChart from '../commands/allMathesChart.js';
import last20Kills from '../commands/last20Kills.js';
import compareKills from '../commands/compareKills.js';
import compareElo from '../commands/compareElo.js';

const COMMAND_PATTERN = /!(.+) (.+)/;

const checkCommands = (content) => {
  const isCommand = COMMAND_PATTERN.test(content);
  const commands = isCommand ? content.match(COMMAND_PATTERN).slice(1, 3) : null;
  return commands;
};

export default async function (msg, faceit) {
  const { content } = msg;
  const checkedCommands = checkCommands(content);
  if (checkedCommands && !msg.author.bot) {
    const [command, nickname] = checkedCommands;
    let embed;
    switch (command) {
      case 'last20':
        embed = await playerLast20Stats(nickname, faceit);
        break;
      case 'search':
        embed = await searchPlayer(nickname, faceit);
        break;
      case 'find':
        embed = await findMathes(nickname, faceit);
        break;
      case 'eloChart':
        embed = await allMatchesChart(nickname, faceit);
        break;
      case 'last20Kills':
        embed = await last20Kills(nickname, faceit);
        break;
      case 'compareKills':
        embed = await compareKills(nickname, faceit);
        break;
      case 'compareElo':
        embed = await compareElo(nickname, faceit);
        break;
      default:
        embed = await playerAverageStats(nickname, faceit);
        break;
    }
    msg.reply({ embed });
  }
}
