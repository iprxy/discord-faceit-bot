const config = require('./config.json')

const Discord = require('discord.js')
const client = new Discord.Client()

const Faceit = require('./faceit-api')
const faceit = new Faceit(config.faceitToken)

const commands = require('./commands')

client.login(config.botToken)
client.on('message', async (msg) => await commands(msg, faceit))
 
