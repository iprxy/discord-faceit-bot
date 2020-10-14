const MakeRequest = require('./makeRequest')

class Players extends MakeRequest {
    constructor(token) {
        super(token)
    }

    async getPlayerDetails (playerId) {
        if (!playerId) throw 'Missing parameter playerId'
        return this.sendRequest(`players/${playerId}`)
    }

    async getPlayerHistory (playerId, game, offset = 0, limit = 20) {
        if (!playerId || !game) throw 'Missing parameter playerId or game'
        const params = {
            game: game,
            offset: offset,
            limit: limit
        }
        return this.sendRequest(`players/${playerId}/history`, params)
    }

    async getPlayerStats (playerId, game) {
        if (!playerId || !game) throw 'Missing parameter playerId or game'
        return this.sendRequest(`players/${playerId}/stats/${game}`)

    }
}

module.exports = Players
