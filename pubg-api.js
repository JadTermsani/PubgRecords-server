const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class PubgAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.PUBG_API_BASE_URL}`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${process.env.API_KEY}`);
    request.headers.set('Accept', 'application/vnd.api+json');
  }

  async getPlayerGames(region, playerName) {
    return this.get(
      `/shards/${region}/players?filter[playerNames]=${playerName}`
    );
  }

  async getMatch(region, matchId) {
    return this.get(`/shards/${region}/matches/${matchId}`);
  }

  async getSeason(region, playerId, season) {
    return this.get(`/shards/${region}/players/${playerId}/seasons/${season}`);
  }
};
