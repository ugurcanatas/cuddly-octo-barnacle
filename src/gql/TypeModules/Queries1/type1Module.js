import { createModule, gql } from "graphql-modules";
import { Trip } from "../../../mongo-models/TaxiZone.js";

export const type1Module = createModule({
  id: "type-1-module-query-1",
  dirname: __dirname,
  typeDefs: gql`
    type MaxPassengerType {
      _id: CustomIDType
      sumPassengers: Int
      countOfDate: Int
    }

    extend type Query {
      findSumOfPassengers: [MaxPassengerType]
    }
  `,
  resolvers: {
    Query: {
      // SQL Conversion
      // SELECT tpep_pickup_datetime as dateString, SUM(passenger_count) AS sumPassengers FROM trips GROUP BY _id, dateString
      findSumOfPassengers: async () => {
        const data = await Trip.aggregate([
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
              sumPassengers: { $sum: "$passenger_count" },
            },
          },
        ])
          .allowDiskUse(true)
          .sort({ sumPassengers: -1 })
          .limit(10);
        return data;
      },
    },
  },
});
