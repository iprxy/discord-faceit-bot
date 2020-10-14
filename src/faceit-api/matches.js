const MakeRequest = require('./makeRequest')

class Matches extends MakeRequest {
    constructor(token) {
        super(token)
    }

    async getMatch(matchId) {
        if (!matchId) throw 'Missing parameter matchId'
        return await this.sendRequest(`matches/${matchId}`)
    }

    async getMatchStats(matchId) {
        if (!matchId) throw 'Missing parameter matchId'
        return await this.sendRequest(`matches/${matchId}/stats`)
    }
}

module.exports = Matches
