import { createModule, gql } from "graphql-modules";
import { TaxiZone } from "../../mongo-models/TaxiZone.js";

export const typeOthers = createModule({
  id: "type-lookup-module",
  dirname: __dirname,
  typeDefs: gql`
    type CustomIDType {
      custom_id: Date
      dateString: String
    }

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
