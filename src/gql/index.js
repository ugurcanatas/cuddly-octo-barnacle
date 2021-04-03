import { createApplication, createModule, gql } from "graphql-modules";
//Query 1
import { type1Module as t1ModuleQ1 } from "./TypeModules/Queries1/type1Module.js";
import { type2Module as t2ModuleQ1 } from "./TypeModules/Queries1/type2Module.js";
import { type3Module as t3ModuleQ1 } from "./TypeModules/Queries1/type3Module.js";
//Query 2
import { type1Module as t1ModuleQ2 } from "./TypeModules/Queries2/type1Module.js";
import { type2Module as t2ModuleQ2 } from "./TypeModules/Queries2/type2Module.js";
import { type3Module as t3ModuleQ2 } from "./TypeModules/Queries2/type3Module.js";
//Query 3
import { type1Module as t1ModuleQ3 } from "./TypeModules/Queries3/type1Module.js";
import { type2Module as t2ModuleQ3 } from "./TypeModules/Queries3/type2Module.js";
import { type3Module as t3ModuleQ3 } from "./TypeModules/Queries3/type3Module.js";

import { typeOthers } from "./TypeModules/typeOthers.js";
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
    typeOthers,
    t1ModuleQ1,
    t2ModuleQ1,
    t3ModuleQ1,
    t1ModuleQ2,
    t2ModuleQ2,
    t3ModuleQ2,
    t1ModuleQ3,
    t2ModuleQ3,
    t3ModuleQ3,
  ],
});

export const schema = application.createSchemaForApollo();
