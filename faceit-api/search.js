const MakeRequest = require('./makeRequest')

class Search extends MakeRequest {
    constructor(token) {
        super(token)
    }

    async searchPlayers(nickname) {
        const method = `search/players`
        const params = { nickname: nickname }
        return this.sendRequest(method, params)
    }
}

module.exports = Search
