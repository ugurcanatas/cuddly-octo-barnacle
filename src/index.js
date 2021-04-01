import mongoose from "mongoose";
//const { Schema } = mongoose;
import { ApolloServer, gql } from "apollo-server";
import { resolvers } from "./gql/resolvers.js";
import { typeDefs } from "./gql/typedefs.js";
import { createApplication } from "graphql-modules";
import { type2Module } from "./gql/TypeModules/type2Module";

const application = createApplication({
  modules: [type2Module],
});
const schema = application.createSchemaForApollo();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  schema,
});

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
