# pubgrecords.com GraphQL server

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![Heroku](http://heroku-badges.herokuapp.com/?app=pubgrecords-graphql)](https://pubgrecords-graphql.herokuapp.com/)

This is currently deployed on heroku and serves as a proxy between the [PUBG API](https://documentation.playbattlegrounds.com/en/introduction.html) and the [pubgrecords](https://www.pubgrecords.com) web app.

## To run locally

```
yarn
```

Rename `.env.example` to `.env` and include your own API Key that you can get from [here](https://developer.playbattlegrounds.com/).

```
yarn dev
```

Go to `http://localhost:3001/`

## To test using the GraphQL interface

After starting the server, go to `http://localhost:3001/api/graphql` to launch it.

### Query examples:

- Get a player ID 

```
query {
  playerId(region:"pc-eu", playerName:"JadT26")
}
```

- Get all Match IDs of a given player:

```
query {
  playerGames(region: "pc-eu", playerName: "JadT26") {
    id
  }
}
```

- Get the season stats of a given player

```
query {
  matchInfo(
  region: "pc-eu",
  playerId: "account.0dd17dd56bfc443e88c98aaa640aa523",
  matchId: "b94cc47d-c560-4bd5-9641-d3857e20e5be"
  ) {
    assists
    damage
    date (YYYY-MM-DD)
    DBNOs
    gameMode
    headshotKills
    heals
    killPlace
    kills
    longestKill
    mapName
    matchDuration (minutes)
    name
    participants
    playerId
    rank
    revives
    rideDistance (meters)
    roadKills
    swimDistance (meters)
    teamKills
    teams
    time (HH:MM:SS)
    timeSurvived (minutes)
    vehiclesDestroyed
    walkDistance (meters)
  }
}
```
- Get Seasonal stats of a given player

```
query {
  getSeasonStats(
    region: "pc-eu"
    playerId: "account.0dd17dd56bfc443e88c98aaa640aa523"
    season: "division.bro.official.2018-04"
  ) {
    assists
    damage
    deaths
    drivingDistance (meters)
    heals
    kdRatio
    kills
    longestGame (minutes)
    longestKill
    mostKills
    revives
    rounds
    runningDistance (meters)
    suicides
    teamKills
    timePlayed (minutes)
    top10s
    vehiclesDestroyed
    wins
  }
}
```
## Telemetry data (coming soon™)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/32297675?v=4" width="100px;"/><br /><sub><b>Jad Termsani</b></sub>](https://github.com/JadTermsani)<br />[💻](https://github.com/JadTermsani/PubgRecords-server/commits?author=JadTermsani "Code") [📖](https://github.com/JadTermsani/PubgRecords-server/commits?author=JadTermsani "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/7265811?v=4" width="100px;"/><br /><sub><b>Serge Kamel</b></sub>](https://github.com/Faultless)<br />[💻](https://github.com/JadTermsani/PubgRecords-server/commits?author=Faultless "Code") [📖](https://github.com/JadTermsani/PubgRecords-server/commits?author=Faultless "Documentation")
| :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
