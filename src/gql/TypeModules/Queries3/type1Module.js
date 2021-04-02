import { createModule, gql } from "graphql-modules";
import { Trip } from "../../../mongo-models/TaxiZone.js";

export const type1Module = createModule({
  id: "type-1-module-query-3",
  dirname: __dirname,
  typeDefs: gql`
    type MaxDistTrip {
      distance: DoubleType
      _id: CustomIDType
    }

    extend type Query {
      getLongestTripByDate(date: String!): [Trip]
    }
  `,
  resolvers: {
    Query: {
      getLongestTripByDate: (_, { date }) => {
        const lteDate = new Date(date);
        lteDate.setDate(new Date(date) + 1);
        const data = Trip.find({
          tpep_pickup_datetime: {
            $gte: new Date(date),
            $lt: lteDate,
          },
        }).limit(10);
        return data;
      },
    },
  },
});
