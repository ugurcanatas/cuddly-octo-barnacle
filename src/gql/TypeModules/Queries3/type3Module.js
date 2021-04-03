import { createModule, gql } from "graphql-modules";
import { Trip } from "../../../mongo-models/TaxiZone.js";

export const type3Module = createModule({
  id: "type-3-module-query-3",
  dirname: __dirname,
  typeDefs: gql`
    type TripTypeMinMaxLookup {
      passenger_count: Int
      PULocationID: Int
      lookup_result: [TaxiZone]
      min: DoubleType
      max: DoubleType
    }
    extend type Query {
      getMin3Passengers(passenger_count: Int = 3): [TripTypeMinMaxLookup]
    }
  `,
  resolvers: {
    Query: {
      getMin3Passengers: async (_, { passenger_count }) => {
        const data = await Trip.aggregate([
          {
            $match: {
              passenger_count: { $gte: passenger_count },
            },
          },
          {
            $group: {
              _id: {
                passenger_count: "$passenger_count",
              },
              PULocationID: { $first: "$PULocationID" },
              passenger_count: { $first: "$passenger_count" },
              max: { $max: "$trip_distance" },
              min: { $min: "$trip_distance" },
            },
          },
          {
            $sort: {
              max: -1,
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
        ]);
        return data;
      },
    },
  },
});
