require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const models = require("./models");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./schema/schema");
const resolvers = require("./schema/resolver");
const app = express();

const userRoutes = require("./routes/auth");

// const MONGO_URI =
//   "mongodb+srv://prerna:Prerna1998@cluster0.y3mfrzr.mongodb.net/pmtool?retryWrites=true&w=majority";
// if (!MONGO_URI) {
//   throw new Error("You must provide a MongoLab URI");
// }

mongoose.Promise = global.Promise;
const connect = mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: false,
      useUnifiedTopology: true,
      // useCreateIndex: true, useFindAndModify: false
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("CONNETION FALED", err));

app.use(bodyParser.json());

// let server = null;
async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  server.applyMiddleware({ app });
}

startApolloServer();

app.use("/api", userRoutes);

app.listen(4000, () => {
  console.log("SERVER LISTENING ON 4000");
});
