// En uzun mesafeli 5 yolculuktaki gün ve mesafeleri listeleyiniz.
import { gql } from "apollo-server";

export const typeDef = gql`
  scalar Date
  scalar DoubleType
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
`;
