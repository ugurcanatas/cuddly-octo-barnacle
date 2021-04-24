require("dotenv").config();
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import { schema } from "./gql/index.js";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  schema,
  cors: {
    origin: "http://localhost:19006",
    credentials: true,
  },
});

//MONGO CLOUD CONNECTION STRING
mongoose
  .connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connected to mongo db");
    return server.listen();
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
