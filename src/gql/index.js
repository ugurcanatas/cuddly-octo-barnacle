import { createApplication, createModule, gql } from "graphql-modules";
import { type1Module as t1ModuleQ1 } from "./TypeModules/Queries1/type1Module.js";
import { type2Module as t2ModuleQ1 } from "./TypeModules/Queries1/type2Module.js";
import { type3Module as t3ModuleQ1 } from "./TypeModules/Queries1/type3Module.js";
import { type3Module as t3ModuleQ2 } from "./TypeModules/Queries2/type3Module.js";
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
  modules: [
    defModule,
    typeScalars,
    t1ModuleQ1,
    t2ModuleQ1,
    t3ModuleQ1,
    t3ModuleQ2,
  ],
});

export const schema = application.createSchemaForApollo();
