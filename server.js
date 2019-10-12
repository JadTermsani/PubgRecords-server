require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const { resolvers, typeDefs } = require('./src/schema');
const PubgAPI = require('./src/endpoints');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ pubgAPI: new PubgAPI() }),
  introspection: true,
  playground: true
});

server.applyMiddleware({ app, path: '/api/graphql' });

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

// make sure server is running online
app.get('/', function(req, res) {
  res.send({ status: 'online', owner: 'Jad Termsani', code: 200 });
});

// verify server is running
app.listen(process.env.PORT || 3002, function() {
  console.log(`hello at ${process.env.PORT}`);
});
