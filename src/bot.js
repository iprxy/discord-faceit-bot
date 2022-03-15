import Discord from 'discord.js'
import Faceit from './faceit-api/index.js'
import reactionController from './controllers/reactionsController.js'
import textController from './controllers/textController.js'

const client = new Discord.Client()
const faceit = new Faceit()

client.login(process.env.DISCORD_TOKEN)
client.on('ready', () => client.user.setActivity('Faceit API', { type: 'WATCHING' }))
client.on('messageReactionAdd', async (reaction) => await reactionController(reaction, faceit))
client.on('message', async (msg) => await textController(msg, faceit))
