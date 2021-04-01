import { createApplication } from "graphql-modules";
import { type2Module } from "./TypeModules/type2Module.js";
import { type3Module } from "./TypeModules/type3Module.js";
import { typeScalars } from "./TypeModules/typeScalars.js";

const application = createApplication({
  modules: [typeScalars, type2Module, type3Module],
});

export const schema = application.createSchemaForApollo();
