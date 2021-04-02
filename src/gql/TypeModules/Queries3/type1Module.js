import { createModule, gql } from "graphql-modules";
import { Trip } from "../../../mongo-models/TaxiZone.js";

export const type1Module = createModule({
  id: "type-1-module-query-3",
  dirname: __dirname,
  typeDefs: gql`
    extend type Query {
      getLongestTripByDate(date: String!): [TripTypeWithLookup]
    }
  `,
  resolvers: {
    Query: {
      getLongestTripByDate: async (_, { date }) => {
        const lteDate = new Date(date);
        lteDate.setDate(new Date(date).getDate() + 1);
        console.log("Date Start", new Date(date));
        console.log("Date End", lteDate);
        const data = await Trip.aggregate([
          {
            $match: {
              tpep_pickup_datetime: {
                $gte: new Date(date),
                $lt: lteDate,
              },
            },
          },
          {
            $lookup: {
              from: "taxizones",
              localField: "PULocationID",
              foreignField: "LocationID",
              as: "lookup_result",
            },
          },
        ])
          .sort({ trip_distance: "desc" })
          .limit(1);
        return data;
      },
    },
  },
});