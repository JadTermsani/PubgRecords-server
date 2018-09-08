# pubgrecords.com GraphQL server

This is currently deployed on heroku and serves as a proxy between the [PUBG API](https://documentation.playbattlegrounds.com/en/introduction.html) and the [pubgrecords](https://www.pubgrecords.com) web app.

## To Run locally

```
yarn
```

Rename `.env.example` to `.env` and include your own API Key that you can get from [here](https://developer.playbattlegrounds.com/).

```
yarn start
```

Go to `http://localhost:3001/`

## To test using the GraphQL interface

After starting the server, go to `http://localhost:3001/api/graphql` to launch it.

A query example that returns all the Match IDs of a given player:

```
query GetMatchesQuery {
  playerGames(region: "pc-eu", playerName: "JadT26") {
    id
  }
}
```
