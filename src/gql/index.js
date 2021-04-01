import { createApplication, createModule, gql } from "graphql-modules";
import { type1Module } from "./TypeModules/Queries1/type1Module.js";
import { type2Module } from "./TypeModules/Queries1/type2Module.js";
import { type3Module } from "./TypeModules/Queries1/type3Module.js";
import { typeScalars } from "./TypeModules/typeScalars.js";

//Use default empty Query for extending into this query.
const defModule = createModule({
  id: "defModule",
  typeDefs: gql`
    type Query {
      _empty: String
    }
  `,
});

const application = createApplication({
  modules: [defModule, typeScalars, type1Module, type2Module, type3Module],
});

export const schema = application.createSchemaForApollo();
