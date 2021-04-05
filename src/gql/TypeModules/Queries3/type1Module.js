import { createModule, gql } from "graphql-modules";
import { Trip } from "../../../mongo-models/TaxiZone.js";

export const type1Module = createModule({
  id: "type-1-module-query-3",
  dirname: __dirname,
  typeDefs: gql`
    type TripTypeWithDOPU {
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
      PULocationResult: [TaxiZone]
      DOLocationResult: [TaxiZone]
    }

    extend type Query {
      getLongestTripByDate(date: String!): [TripTypeWithDOPU]
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
              as: "PULocationResult",
            },
          },
          {
            $lookup: {
              from: "taxizones",
              localField: "DOLocationID",
              foreignField: "LocationID",
              as: "DOLocationResult",
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
