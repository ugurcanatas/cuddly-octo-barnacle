import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar Date
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
    trip_distance: Float!
    RatecodeID: Int!
    store_and_fwd_flag: String!
    PULocationID: Int!
    DOLocationID: Int!
    payment_type: Int!
    fare_amount: Float!
    extra: Float!
    mta_tax: Float!
    tip_amount: Float!
    tolls_amount: Float!
    improvement_surcharge: Float!
    total_amount: Float!
    congestion_surcharge: Float!
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
    trips(tip_amount: Float!): [Trip]
  }
`;
