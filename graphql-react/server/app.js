const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb://admin:test123@ds125342.mlab.com:25342/gql-testing', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log("Connected to database");
})

// TODO: Forsettt https://youtu.be/ed8SzALpx1Q?t=7940

app.use("/graphql", graphqlHTTP({
  // Must contain a schema to work
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
