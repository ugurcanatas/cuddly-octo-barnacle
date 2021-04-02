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

    type TaxiZone {
      _id: String
      LocationID: Int!
      Borough: String!
      Zone: String!
      service_zone: String!
    }

    type TripTypeWithLookup {
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
      lookup_result: [TaxiZone]
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
