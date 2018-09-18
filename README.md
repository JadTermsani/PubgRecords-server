# pubgrecords.com GraphQL server

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![Heroku](http://heroku-badges.herokuapp.com/?app=pubgrecords-graphql)](https://pubgrecords-graphql.herokuapp.com/)

This is currently deployed on [heroku](https://pubgrecords-graphql.herokuapp.com/api/graphql) and serves as a proxy between the [PUBG API](https://documentation.playbattlegrounds.com/en/introduction.html) and the [pubgrecords](https://www.pubgrecords.com) web app.

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

- Locally:

After starting the server, go to `http://localhost:3001/api/graphql` to launch it.

- On the Web

Go to https://pubgrecords-graphql.herokuapp.com/api/graphql

`Note: Don't worry about the errors, queries will work normally`

### Query examples:

- Get a player ID:

```
query {
  playerId(region:"pc-eu", playerName:"JadT26")
}
```

- Get all match IDs for a given player:

```
query {
  playerGames(region: "pc-eu", playerName: "JadT26") {
    id
  }
}
```

- Get the details of 1 or more matches for a given player:

```
query {
  matchesInfo(
    region: "pc-eu"
    playerId: "account.c04b3561ec5442c9bb52433648482b65"
    matchesId: "a3d0171b-0288-4e59-be08-2414eb1ebc31"
    // matchesId: ["a3d0171b-0288-4e59-be08-2414eb1ebc31", "22a67e10-30e6-4fcd-b902-9759015c0dcc", "4780ad2f-6d93-4a8b-b4da-efe5c0db2fda"]
  ) {
    playersInfo {
      assists
      damage
      DBNOs
      headshotKills
      heals
      killPlace
      kills
      longestKill
      name
      playerId
      rank
      revives
      rideDistance (meters)
      roadKills
      swimDistance (meters)
      teamKills
      timeSurvived (minutes)
      vehiclesDestroyed
      walkDistance (meters)
    }
    generalInfo {
      date (YYYY-MM-DD)
      gameMode
      mapName
      matchDuration (minutes)
      participants
      teams
      time (HH:MM:SS)
      userRank
    }
  }
}
```
- Get the seasonal stats for a given player

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
