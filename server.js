require('dotenv').config({ path: 'keys.env' });
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const { resolvers, typeDefs } = require('./schema');
const { ApolloServer } = require('apollo-server-express');
const PubgAPI = require('./pubg-api');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ pubgAPI: new PubgAPI() })
});

server.applyMiddleware({ app, path: '/api/graphql' });

const API_KEY = process.env.API_KEY;

// enable CORS for cross-browser support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});
app.options('*', cors());

// serve static files
app.use(express.static('public'));
app.use('/', express.static(`${__dirname}/build`));

// make sure server is running
app.get('/', function(req, res) {
  res.send({ status: 'online', owner: 'Jad Termsani', code: 200 });
});

// for robots.txt
app.get('/robots.txt', function(req, res) {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

// check the pubg api status
app.get('/status/', function(req, res) {
  axios
    .get('https://api.playbattlegrounds.com/status', {
      headers: {
        Accept: 'application/vnd.api+json'
      }
    })
    .then(() => {
      res.send({ status: 'online', code: 200 });
    })
    .catch(error => {
      console.log(error);
    });
});

// get a player's games played
app.get('/player/:region/:player', function(req, res) {
  axios
    .get(
      `https://api.playbattlegrounds.com/shards/${
        req.params.region
      }/players?filter[playerNames]=${player}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: 'application/vnd.api+json'
        }
      }
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.sendStatus(error.response.status);
    });
});

// get single match details
app.get('/match/:region/:matchId', function(req, res) {
  axios
    .get(
      `https://api.playbattlegrounds.com/shards/${req.params.region}/matches/${
        req.params.matchId
      }`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: 'application/vnd.api+json'
        }
      }
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.sendStatus(error.response.status);
    });
});

// get seasonal stats
app.get('/season/:region/:playerId/:season', function(req, res) {
  axios
    .get(
      `https://api.playbattlegrounds.com/shards/${req.params.region}/players/${
        req.params.playerId
      }/seasons/${req.params.season}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: 'application/vnd.api+json'
        }
      }
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.sendStatus(error.response.status);
    });
});

// verify server is running
app.listen(process.env.PORT || 3002, function() {
  console.log(`hello at ${process.env.PORT}`);
});
