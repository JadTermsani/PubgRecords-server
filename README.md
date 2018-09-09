# pubgrecords.com GraphQL server
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/7265811?v=4" width="100px;"/><br /><sub><b>Serge Kamel</b></sub>](https://github.com/Faultless)<br />[💻](https://github.com/JadTermsani/PubgRecords-server/commits?author=Faultless "Code") [📖](https://github.com/JadTermsani/PubgRecords-server/commits?author=Faultless "Documentation") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!