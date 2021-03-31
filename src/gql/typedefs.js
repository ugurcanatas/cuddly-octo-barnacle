import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar Date
  scalar DoubleType
  type TaxiZone {
    id: ID!
    LocationID: Int!
    Borough: String!
    Zone: String!
    service_zone: String!
  }

  type Trip {
    id: ID!
    VendorID: Int!
    tpep_pickup_datetime: Date!
    tpep_dropoff_datetime: Date!
    passenger_count: Int!
    trip_distance: DoubleType!
    RatecodeID: Int!
    store_and_fwd_flag: String!
    PULocationID: Int!
    DOLocationID: Int!
    payment_type: Int!
    fare_amount: DoubleType!
    extra: DoubleType!
    mta_tax: DoubleType!
    tip_amount: DoubleType!
    tolls_amount: DoubleType!
    improvement_surcharge: DoubleType!
    total_amount: DoubleType!
    congestion_surcharge: DoubleType!
  }

  type Mutation {
    insertTaxiZone(
      LocationID: Int!
      Borough: String!
      Zone: String!
      service_zone: String!
    ): TaxiZone!
  }

  type Query {
    taxizones: [TaxiZone]
    getTaxiServiceZone(service_zone: String!): TaxiZone
    trips(tip_amount: DoubleType!): [Trip]
  }
`;
