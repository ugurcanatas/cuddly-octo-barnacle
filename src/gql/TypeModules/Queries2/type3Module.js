import { createModule, gql } from "graphql-modules";
import { Trip } from "../../../mongo-models/TaxiZone.js";

export const type3Module = createModule({
  id: "type-3-module-query-2",
  dirname: __dirname,
  typeDefs: gql`
    type TripWithTimeStamp {
      id: ID
      VendorID: Int
      tpep_pickup_datetime: Date
      tpep_dropoff_datetime: Date
      passenger_count: Int
      trip_distance: DoubleType
      RatecodeID: Int
      store_and_fwd_flag: String
      PULocationID: Int
      DOLocationID: Int
      payment_type: Int
      fare_amount: DoubleType
      extra: DoubleType
      mta_tax: DoubleType
      tip_amount: DoubleType
      tolls_amount: DoubleType
      improvement_surcharge: DoubleType
      total_amount: DoubleType
      congestion_surcharge: DoubleType
      startDate: String
      endDate: String
    }
    extend type Query {
      getMinDistanceTrips(
        date_first: String!
        date_second: String!
      ): [TripWithTimeStamp]
    }
  `,
  resolvers: {
    Query: {
      getMinDistanceTrips: async (_, { date_first, date_second }) => {
        const data = await Trip.aggregate([
          {
            $match: {
              tpep_pickup_datetime: {
                $gte: new Date(date_first),
                $lte: new Date(date_second),
              },
            },
          },
          {
            $addFields: {
              startDate: {
                $dateToString: {
                  format: "%Y-%m-%d %H:%M:%S",
                  date: "$tpep_pickup_datetime",
                },
              },
              endDate: {
                $dateToString: {
                  format: "%Y-%m-%d %H:%M:%S",
                  date: "$tpep_dropoff_datetime",
                },
              },
            },
          },
        ])
          .sort({ trip_distance: "desc" })
          .limit(5);
        return data;
      },
    },
  },
});
