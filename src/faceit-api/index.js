const Players = require('./players')
const Matches = require('./matches')
const Search = require('./search')

class Faceit {
    constructor(token) {
        this.players = new Players(token)
        this.matches = new Matches(token)
        this.search = new Search(token)
    }
}

module.exports = Faceit
