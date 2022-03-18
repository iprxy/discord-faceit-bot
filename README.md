# discord-faceit-bot
Simple bot to get CS:GO stats from faceit.com [Add to Discord](https://discord.com/api/oauth2/authorize?client_id=765642102800646146&permissions=18432&scope=bot)  

[![Discord Bots](https://top.gg/api/widget/765642102800646146.svg)](https://top.gg/bot/765642102800646146)

## Available commands
### !stats nickname
Command returns average CS:GO stats for a player:  
<img src="./assets/statsCommand.png" width="450">

### !last20 nickname
Command returns average CS:GO stats for a last 20 player matches:
<img src="./assets/last20Command.png" width="450">

### !find nickname1+nickname2
Command returns list of together matches between too players:
<img src="./assets/findCommand.png" width="450">

### !eloChart nickname
Command returns chart of elo for all matches (if matches count more 2000 command return only 2000):
<img src="./assets/eloChartCommand.png" width="450">

### !last20Kills nickname
Command returns chart of kills count for last 20 matches:
<img src="./assets/last20KillsCommand.png" width="450">

### !compareKills nickname1+nickname2
Command returns compare chart with kills count for last 20 matches between 2 players:
<img src="./assets/compareKillsCommand.png" width="450">

### !compareElo nickname1+nickname2
Command returns compare chart with elo count for last 20 matches between 2 players:
<img src="./assets/compareEloCommand.png" width="450">

On error bot replies you:  
<img src="./assets/statsError.png" width="450">
### !search {faceit nickname}
Command returns search results  
<img src="./assets/searchResult.png" width="450">

## Reaction message to update
Any reaction on message with stats updated message.  
You not need send different messages, just reaction on old message  
<img src="./assets/updateCommand.png" width="450">

