const axios = require('axios')

class MakeRequest {
    constructor(token) {
        this.APIURL = 'https://open.faceit.com/data/v4/'
        axios.defaults.headers = {'Authorization': `Bearer ${token}`}
    }

    async sendRequest(method, data) {
        try {
            const params = data ? { params: data } : {}
            const request = await axios.get(this.APIURL + method, params)
            return request.data
        } catch (err) {
            return this.processError(err)
        }
    }

    async processError(err) {
        const error = await err
        throw `Error: ${error.response.status}: ${error.response.statusText}`
    }

}

module.exports = MakeRequest