# pubgrecords.com GraphQL server

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![Heroku](http://heroku-badges.herokuapp.com/?app=pubgrecords-graphql&style=flat)](https://pubgrecords-graphql.herokuapp.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This is currently deployed on [heroku](https://pubgrecords-graphql.herokuapp.com/api/graphql) and serves as a proxy between the [PUBG API](https://documentation.playbattlegrounds.com/en/introduction.html) and the [pubgrecords](https://www.pubgrecords.com) web app.

## To run locally :computer:

```
yarn
```

Rename `.env.example` to `.env` and include your own API Key that you can get from [here](https://developer.playbattlegrounds.com/).

```
yarn dev
```

Go to http://localhost:3001/

## To test using the GraphQL interface

- Locally :computer: :

After starting the server, go to http://localhost:3001/api/graphql to launch it.

- On the Web :earth_asia: :

Go to https://pubgrecords-graphql.herokuapp.com/api/graphql

`Note: Don't worry about the errors, queries will work normally` :smile:

### Query examples:

#### Get a player ID:

Query:

```graphql
query {
  playerId(region:"pc-eu", playerName:"JadT26")
}
```
Result:

```json
{
  "data": {
    "playerId": "account.c04b3561ec5442c9bb52433648482b65"
  }
}
```

#### Get all match IDs for a given player:

Query:

```graphql
query {
  playerGames(region: "pc-eu", playerName: "JadT26") {
    id
  }
}
```
Result:

```
{
  "data": {
    "playerGames": [
      {
        "id": "a3f7f354-bab0-4b54-9a3f-3ba5f0bc0cdb"
      },
      {
        "id": "a3d0171b-0288-4e59-be08-2414eb1ebc31"
      },
      {
        "id": "22a67e10-30e6-4fcd-b902-9759015c0dcc"
      },
      ...
    ]
  }
}
```

#### Get the details of 1 or more matches for a given player:

Query:

```graphql
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

Result (of a single match): 

```json
{
  "data": {
    "matchesInfo": [
      {
        "playersInfo": [
          {
            "assists": 0,
            "damage": 335,
            "DBNOs": 0,
            "headshotKills": 0,
            "heals": 12,
            "killPlace": 23,
            "kills": 1,
            "longestKill": 28,
            "name": "JadT26",
            "playerId": "account.c04b3561ec5442c9bb52433648482b65",
            "rank": 9,
            "revives": 1,
            "rideDistance": 2048,
            "roadKills": 0,
            "swimDistance": 0,
            "teamKills": 0,
            "timeSurvived": 24,
            "vehiclesDestroyed": 1,
            "walkDistance": 3341
          },
          {
            "assists": 1,
            "damage": 99,
            "DBNOs": 1,
            "headshotKills": 1,
            "heals": 11,
            "killPlace": 24,
            "kills": 1,
            "longestKill": 32,
            "name": "sguss",
            "playerId": "account.c04b3561ec5442c9bb52433648482b65",
            "rank": 9,
            "revives": 1,
            "rideDistance": 2035,
            "roadKills": 0,
            "swimDistance": 0,
            "teamKills": 0,
            "timeSurvived": 24,
            "vehiclesDestroyed": 0,
            "walkDistance": 3654
          }
        ],
        "generalInfo": {
          "date": "2018-09-17",
          "gameMode": "duo-fpp",
          "mapName": "Erangel_Main",
          "matchDuration": 31,
          "participants": 87,
          "teams": 44,
          "time": "20:35:47",
          "userRank": 9
        }
      }
    ]
  }
}
```

#### Get the seasonal stats for a given player

Query:

```graphql
query {
  getSeasonStats(
    region: "pc-eu"
    playerId: "account.c04b3561ec5442c9bb52433648482b65"
    season: "division.bro.official.2018-08"
  ) {
    assists
    damage
    deaths
    drivingDistance (meters)
    heals
    kdRatio
    kills
    longestGame (minutes)
    longestKill (meters)
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

Result:

```json
{
  "data": {
    "getSeasonStats": {
      "assists": 22,
      "damage": 7675,
      "deaths": 69,
      "drivingDistance": 16212,
      "heals": 169,
      "kdRatio": 0.65,
      "kills": 45,
      "longestGame": 26,
      "longestKill": 226.07,
      "mostKills": 5,
      "revives": 14,
      "rounds": 69,
      "runningDistance": 54739,
      "suicides": 0,
      "teamKills": 1,
      "timePlayed": 578,
      "top10s": 16,
      "vehiclesDestroyed": 0,
      "wins": 1
    }
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
