import { createModule, gql } from "graphql-modules";
import { Trip } from "../../../mongo-models/TaxiZone.js";

export const type2Module = createModule({
  id: "type-2-module-query-1",
  dirname: __dirname,
  typeDefs: gql`
    type CustomType {
      _id: CustomIDType
      total: DoubleType
      countOfDate: Int
    }

    extend type Query {
      #Find most traveled day smaller than param
      mostTraveledUnder(trip_distance: DoubleType!): [CustomType]
    }
  `,
  resolvers: {
    Query: {
      mostTraveledUnder: async (_, { trip_distance }) => {
        const data = await Trip.aggregate([
          { $match: { trip_distance: { $lte: trip_distance } } },
          {
            $group: {
              _id: {
                custom_id: "$tpep_pickup_datetime",
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%d %H:%M:%S",
                    date: "$tpep_pickup_datetime",
                  },
                },
              },
              total: { $sum: "$trip_distance" },
              countOfDate: { $sum: 1 },
            },
          },
        ])
          .allowDiskUse(true)
          .sort({ total: -1 })
          .limit(5);

        console.log("WAITING FOR QUERY: ", data);
        return data;
      },
    },
  },
});
