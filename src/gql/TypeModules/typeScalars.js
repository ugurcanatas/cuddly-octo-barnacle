import { createModule, gql } from "graphql-modules";
import { dateScalar } from "../CustomScalarTypes/dateScalar";
import { doubleScalar } from "../CustomScalarTypes/doubleScalar";
export const typeScalars = createModule({
  id: "type-custom-module",
  dirname: __dirname,
  typeDefs: gql`
    scalar Date
    scalar DoubleType
  `,
  resolvers: {
    Date: dateScalar,
    DoubleType: doubleScalar,
  },
});
