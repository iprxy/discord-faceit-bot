/* eslint-disable camelcase */
/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-expressions */
import axios from 'axios'
import {
  last20StatsMap,
  averageStatsMap
} from './statsMapping.js'

export default class Faceit {
  constructor () {
    this.API_URL = 'https://api.faceit.com'
  }

  async _makeRequest (method, params = {}) {
    try {
      const request = await axios.get(this.API_URL + method, params)
      return request.data
    } catch (err) {
      throw `Something went wrong: ${err.response.data.message || err}`
    }
  }

  async _searchUsers (username) {
    const data = await this._makeRequest(`/search/v2/players?limit=30&offset=0&query=${username}`)
    const users = data.payload.results
    if (!users.length) throw `Users with ${username} not found`

    return users
  }

  async _getUserInfo (username) {
    // faceit checks case in username :( fix it
    const users = await this._searchUsers(username)
    const isNeededUser = users[0].nickname.toLowerCase() !== username.toLowerCase

    if (!isNeededUser) `Users with ${username} not found`

    const userId = users[0].guid
    const data = await this._makeRequest(`/core/v1/users/${userId}`)
    return data.payload
  }

  _mapKeys (mapping, collection) {
    return Object.keys(mapping).reduce((acc, curr) => ({
      ...acc,
      [mapping[curr]]: Number(collection[curr])
    }), {})
  }

  _calculateAverageStats (segments, mapping) {
    const stats = segments.map(item => this._mapKeys(mapping, item))
    return stats
      .reduce(
        (acc, curr, i) =>
          Object.keys(curr).reduce((acc2, curr2) => {
            let value
            if (stats.length === i + 1) {
              if (curr2.includes('average') || curr2.includes('winRate')) {
                value = (acc[curr2].reduce((acc3, curr3) =>
                  acc3 + curr3, curr[curr2]) / stats.length)
                  .toFixed(2) / 1
              } else {
                value = (acc[curr2].reduce((acc3, curr3) =>
                  acc3 + curr3, curr[curr2]))
              }
            } else {
              value = (acc[curr2] || []).concat(curr[curr2])
            }
            return {
              ...acc2,
              [curr2]: value
            }
          }, {}), {}
      )
  }

  async _transformStats (stats) {
    const competitiveSegments = stats.segments
      .filter(x => x._id.segmentId !== 'csgo_map')
      .map(item => Object.values(item.segments)).flat()

    if (competitiveSegments.length === 0) throw 'There is no stats to see'

    let transformedStats

    if (competitiveSegments.length === 1) {
      transformedStats = this._mapKeys(averageStatsMap, competitiveSegments[0])
    } else {
      transformedStats = this._calculateAverageStats(competitiveSegments, averageStatsMap)
    }

    // add some global stats
    transformedStats.recentResults = stats.lifetime.s0.map(item => item === '0' ? 'L' : 'W').join(' ')
    transformedStats.currentWinstreak = Number(stats.lifetime.s1)
    transformedStats.longestWinstreak = Number(Number(stats.lifetime.s2))

    return transformedStats
  }

  async getAverageStats (username) {
    const userInfo = await this._getUserInfo(username)

    if (!userInfo.games.csgo) throw 'User have no CSGO stats on Faceit'

    const userId = userInfo.guid
    const userStats = await this._makeRequest(`/stats/api/v1/stats/users/${userId}/games/csgo`)
    const averageStats = await this._transformStats(userStats)

    const { nickname, avatar, country } = userInfo
    const { skill_level, faceit_elo } = userInfo.games.csgo

    return {
      nickname,
      avatar,
      country,
      level: skill_level,
      elo: faceit_elo,
      ...averageStats
    }
  }

  async getLast20Stats (username) {
    const userInfo = await this._getUserInfo(username)

    if (!userInfo.games.csgo) throw 'User have no CSGO stats on Faceit'
    const userId = userInfo.guid
    const userStats = await this._makeRequest(`/stats/api/v1/stats/time/users/${userId}/games/csgo?size=20`)
    const last20Stats = this._calculateAverageStats(userStats, last20StatsMap)

    const { nickname, avatar, country } = userInfo
    const { skill_level, faceit_elo } = userInfo.games.csgo

    return {
      nickname,
      avatar,
      country,
      level: skill_level,
      elo: faceit_elo,
      ...last20Stats
    }
  }

  async searchCSGOUsers (username) {
    const users = await this._searchUsers(username)
    return users
      .map(item => {
        item.games = item.games.filter(x => x.name === 'csgo')
        return item
      })
      .filter(x => x.games.length)
  }
}
