import { createModule, gql } from "graphql-modules";
import { TaxiZone } from "../../mongo-models/TaxiZone.js";

export const typeLocationsModule = createModule({
  id: "type-lookup-module",
  dirname: __dirname,
  typeDefs: gql`
    type Locations {
      LocationID: Int
      Borough: String
      Zone: String
      service_zone: String
    }

    extend type Query {
      getLocations: [Locations]
    }
  `,
  resolvers: {
    Query: {
      getLocations: async () => {
        return await TaxiZone.find();
      },
    },
  },
});
