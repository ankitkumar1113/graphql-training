const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema/schemaa');
const mongoose = require('mongoose')
const cors = require('cors')

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/ninja_reading';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open',() => {
    console.log('connected to database');
})
mongoose.connection.once('error',() => {
    console.log('connected to database failed');
})


const app = express();
app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app });

app.listen(4000, () =>{
    console.log('listening for request on port 4000');
})