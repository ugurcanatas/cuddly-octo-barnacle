import { createModule, gql } from "graphql-modules";
import { dateScalar } from "../../CustomScalarTypes/dateScalar";
import { doubleScalar } from "../../CustomScalarTypes/dateScalar";
import { Trip } from "../../../mongo-models/TaxiZone.js";

export const type3Module = createModule({
  id: "type-3-module-query-1",
  dirname: __dirname,
  typeDefs: gql`
    type Trip {
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
    }

    extend type Query {
      #Find Top 5 max trip distance query
      maxDistanceTrips: [Trip]
    }
  `,
  resolvers: {
    Query: {
      maxDistanceTrips: () => {
        return Trip.find().sort({ trip_distance: -1 }).limit(50);
      },
    },
  },
});
