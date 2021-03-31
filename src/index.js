import mongoose from "mongoose";
//const { Schema } = mongoose;
import { ApolloServer, gql } from "apollo-server";
import { resolvers } from "./gql/resolvers.js";
import { typeDefs } from "./gql/typedefs.js";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect("mongodb://localhost:27017/taxiDB", {
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
