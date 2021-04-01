import { createModule, gql } from "graphql-modules";
import { Trip } from "../../../mongo-models/TaxiZone.js";

export const type3Module = createModule({
  id: "type-2-module-query-2",
  dirname: __dirname,
  typeDefs: gql`
    extend type Query {
      getMinDistanceTrips(date_first: String, date_second: String): [Trip]
    }
  `,
  resolvers: {
    Query: {
      getMinDistanceTrips: async (_, { date_first, date_second }) => {
        const data = await Trip.find({
          tpep_pickup_datetime: {
            $gte: new Date(date_first),
            $lte: new Date(date_second),
          },
        })
          .sort({ trip_distance: "desc" })
          .limit(5);
        return data;
      },
    },
  },
});
