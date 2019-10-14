# pubgrecords.com GraphQL server

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![Heroku](http://heroku-badges.herokuapp.com/?app=pubgrecords-graphql&style=flat)](https://pubgrecords-graphql.herokuapp.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This server is currently deployed on [heroku](https://pubgrecords-graphql.herokuapp.com/api/graphql) and serves as a proxy between the [PUBG API](https://documentation.playbattlegrounds.com/en/introduction.html) and both Pubg Records Apps:

Web App: [PubgRecords.com](https://www.pubgrecords.com)

## Table of Contents

- [pubgrecords.com GraphQL server](#pubgrecordscom-graphql-server)
  - [Table of Contents](#table-of-contents)
  - [Run locally :computer:](#run-locally-computer)
  - [Test using the GraphQL interface](#test-using-the-graphql-interface)
    - [Query examples](#query-examples)
      - [Player ID](#player-id)
      - [All match IDs for a given player](#all-match-ids-for-a-given-player)
      - [Match Details for 1 or more matches](#match-details-for-1-or-more-matches)
      - [Seasonal stats for a given player](#seasonal-stats-for-a-given-player)
      - [Lifetime stats for a given player](#lifetime-stats-for-a-given-player)
      - [Weapon Mastery for a given player](#weapon-mastery-for-a-given-player)
      - [Leaderboards](#leaderboards)
  - [Telemetry data :tada:](#telemetry-data-tada)
    - [Coordinates](#coordinates)
      - [Scale Example](#scale-example)
      - [Get the coordinates of single or multiple players of a game](#get-the-coordinates-of-single-or-multiple-players-of-a-game)
  - [Contributors](#contributors)

## Run locally :computer:

Install dependencies

```bash
yarn install
```

Rename `.env.example` to `.env` and include your own API Key that you can get from [here](https://developer.playbattlegrounds.com/).

Run the dev server

```bash
yarn dev
```

Go to http://localhost:3001/

## Test using the GraphQL interface

- Locally :computer: :

After starting the server, go to http://localhost:3001/api/graphql to launch it.

- Online :earth_asia: :

Go to https://pubgrecords-graphql.herokuapp.com/api/graphql

### Query examples

#### Player ID

Query:

```graphql
query {
  playerId(region: "steam", playerName: "JadT26")
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

#### All match IDs for a given player

Query:

```graphql
query {
  playerGames(region: "steam", playerName: "JadT26") {
    id
  }
}
```

Result:

```json
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

#### Match Details for 1 or more matches

Query:

```graphql
query {
  matchesInfo(
    region: "steam"
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
      team
      teams
      telemetryUrl
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
          "team": ["JadT26", "sguss"],
          "teams": 44,
          "telemetryUrl": "https://telemetry-cdn.playbattlegrounds.com/bluehole-pubg/pc-eu/2019/03/23/14/11/8a691612-4d75-11e9-ad4d-0a586463690a-telemetry.json",
          "time": "20:35:47",
          "userRank": 9
        }
      }
    ]
  }
}
```

#### Seasonal stats for a given player

Query:

```graphql
query {
  getSeasonStats(
    region: "steam"
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

#### Lifetime stats for a given player

Query:

```graphql
query {
  getLifetimeStats(
    region: "steam"
    playerId: "account.c04b3561ec5442c9bb52433648482b65"
  ) {
    assists
    damage
    dBNOs
    deaths
    drivingDistance (meters)
    headshotKills
    heals
    kdRatio
    kills
    longestGame (minutes)
    longestKill (meters)
    revives
    roadKills
    roundMostKills
    rounds
    runningDistance (meters)
    suicides
    swimDistance (meters)
    teamKills
    timePlayed (minutes)
    top10s
    vehiclesDestroyed
    weaponsAcquired
    wins
  }
}
```

Result:

```json
{
  "data": {
    "getLifetimeStats": {
      "assists": 98,
      "damage": 39734,
      "dBNOs": 205,
      "deaths": 507,
      "drivingDistance": 314073,
      "headshotKills": 62,
      "heals": 980,
      "kdRatio": 0.49,
      "kills": 246,
      "longestGame": 31,
      "longestKill": 413.64,
      "revives": 109,
      "roadKills": 2,
      "roundMostKills": 6,
      "rounds": 512,
      "runningDistance": 354559,
      "suicides": 11,
      "swimDistance": 1935,
      "teamKills": 15,
      "timePlayed": 4453,
      "top10s": 73,
      "vehiclesDestroyed": 0,
      "weaponsAcquired": 1377,
      "wins": 6
    }
  }
}
```

#### Weapon Mastery for a given player

Query:

```graphql
query {
  weaponMastery(
    region: "steam"
    playerId: "account.c04b3561ec5442c9bb52433648482b65"
  ) {
    name
    stats {
      damage
      defeats
      headshots
      kills
      knocks
      levelCurrent
      longRangeKills
      longestKill
      roundMostDamage
      roundMostDefeats
      roundMostHeadshots
      roundMostKills
      roundMostKnocks
      tierCurrent
      xpTotal
    }
    medals {
      count
      medalId
    }
  }
}
```

Result:

```json
{
  "data": {
    "weaponMastery": [
      {
        "name": "Item_Weapon_AK47_C",
        "stats": {
          "damage": 2353.9,
          "defeats": 19,
          "headshots": 14,
          "kills": 12,
          "knocks": 14,
          "levelCurrent": 10,
          "longRangeKills": 0,
          "longestKill": 50.36,
          "roundMostDamage": 407.51,
          "roundMostDefeats": 3,
          "roundMostHeadshots": 3,
          "roundMostKills": 2,
          "roundMostKnocks": 3,
          "tierCurrent": 2,
          "xpTotal": 50790
        },
        "medals": [
          {
            "count": 6,
            "medalId": "MedalDeadeye"
          },
          {
            "count": 5,
            "medalId": "MedalAssassin"
          },
          {
            "count": 2,
            "medalId": "MedalPunisher"
          }
        ]
      },
      {
        "name": "Item_Weapon_AUG_C",
        "stats": {
          "damage": 283.33,
          "defeats": 1,
          "headshots": 1,
          "kills": 0,
          "knocks": 1,
          "levelCurrent": 2,
          "longRangeKills": 0,
          "longestKill": 28.1,
          "roundMostDamage": 151.72,
          "roundMostDefeats": 1,
          "roundMostHeadshots": 1,
          "roundMostKills": 0,
          "roundMostKnocks": 1,
          "tierCurrent": 1,
          "xpTotal": 6142
        },
        "medals": [
          {
            "count": 1,
            "medalId": "MedalDeadeye"
          }
        ]
      },
      ...
      ...
    ]
  }
}
```

#### Leaderboards

Query:

```graphql
query {
  leaderboards(gameMode: "duo", count: 50) {
    id
    name
    rank
    stats {
      averageDamage
      averageRank
      games
      killDeathRatio
      kills
      rankPoints
      winRatio (%)
      wins
    }
  }
}
```

Results are ordered by player rank

```json
{
  "data": {
    "leaderboards": [
      {
        "name": "HuYaTV-17044129",
        "rank": 1,
        "id": "account.829af3612d4c4bed8d82a93a176eb7a6",
        "stats": {
          "rankPoints": 7508,
          "wins": 685,
          "games": 2637,
          "winRatio": 25.98,
          "averageDamage": 367,
          "kills": 8609,
          "killDeathRatio": 4.17,
          "averageRank": 12.99
        }
      },
      {
        "name": "XiGua-520820_Xg",
        "rank": 2,
        "id": "account.18455fef7f114facb739bd23ad370e29",
        "stats": {
          "rankPoints": 7505,
          "wins": 557,
          "games": 2822,
          "winRatio": 19.74,
          "averageDamage": 314,
          "kills": 7371,
          "killDeathRatio": 3.16,
          "averageRank": 12.81
        }
      },
      ...
```

## Telemetry data :tada:

### Coordinates

The coordinates represent the player's movement from the moment the player lands until his death (or victory).
The query requires a `telemetry url` and a `username` of a participant of this match.
The `scale` parameter is optional and you can use it to return the coordinated scaled to your preference.

#### Scale Example

Erangel is 816000 x 816000 and I want to scale the coordinates to be translated on a 408x408 px canvas. To achieve this, I add a `scale` parameter to the query and give it a value of 2500.

#### Get the coordinates of single or multiple players of a game

```graphql
query {
  telemetry(
    # Replace the url with your telemetry URL
    url: "https://telemetry-cdn.playbattlegrounds.com/bluehole-pubg/pc-eu/telemetry.json"
    users: "JadT26"
    # users: ["JadT26", "sguss"]
    scale: 2500
  ) {
    Coordinates {
      Id
      Coords {
        x
        y
        z
      }
    }
  }
}
```

Response of a single player:

```json
{
  "data": {
    "telemetry": {
      "Coordinates": {
        "Id": "JadT26",
        "Coords": [
          {
            "x": 202,
            "y": 292,
            "z": 1256
          },
          {
            "x": 199,
            "y": 292,
            "z": 1256
          },
          {
            "x": 199,
            "y": 292,
            "z": 1256
          },
          ...
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/32297675?v=4" width="100px;"/><br /><sub><b>Jad Termsani</b></sub>](https://github.com/JadTermsani)<br />[💻](https://github.com/JadTermsani/PubgRecords-server/commits?author=JadTermsani "Code") [📖](https://github.com/JadTermsani/PubgRecords-server/commits?author=JadTermsani "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/7265811?v=4" width="100px;"/><br /><sub><b>Serge Kamel</b></sub>](https://github.com/Faultless)<br />[💻](https://github.com/JadTermsani/PubgRecords-server/commits?author=Faultless "Code") [📖](https://github.com/JadTermsani/PubgRecords-server/commits?author=Faultless "Documentation") |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
