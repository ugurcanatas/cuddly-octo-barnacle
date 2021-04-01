//• Belirli mesafenin altında en ¸cok seyahat yapılan g¨un¨u ve seyahat uzunlu˘gunu bulunuz
//(mesafe se¸cilebilmeli).
import { gql } from "apollo-server";

export const typeDefs = gql`
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

  type CustomIDType {
    custom_id: Date
    dateString: String
  }

  type CustomType {
    _id: CustomIDType
    total: DoubleType
    countOfDate: Int
  }

  extend type Query {
    #Find most traveled day smaller than param
    mostTraveledUnder(trip_distance: DoubleType!): [CustomType]
  }
`;
