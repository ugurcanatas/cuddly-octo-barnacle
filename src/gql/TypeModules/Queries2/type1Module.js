import { createModule, gql } from "graphql-modules";
import { Trip } from "../../../mongo-models/TaxiZone.js";

export const type1Module = createModule({
  id: "type-1-module-query-2",
  dirname: __dirname,
  typeDefs: gql`
    type SpesificLocation {
      _id: String
      countOfVehicles: Int
    }

    extend type Query {
      getSpesificLocation(
        LocationID: Int!
        date_start: String!
        date_end: String!
      ): [SpesificLocation]
    }
  `,
  resolvers: {
    Query: {
      getSpesificLocation: async (_, { LocationID, date_start, date_end }) => {
        const data = await Trip.aggregate([
          {
            $match: {
              $and: [
                {
                  PULocationID: LocationID,
                },
                {
                  tpep_pickup_datetime: {
                    $gte: new Date(date_start),
                    $lte: new Date(date_end),
                  },
                },
              ],
            },
          },
          {
            $group: {
              _id: "$PULocationID",
              countOfVehicles: { $sum: "$PULocationID" },
              //countOfDate: { $sum: 1 },
            },
          },
        ]);
        return data;
      },
    },
  },
});
