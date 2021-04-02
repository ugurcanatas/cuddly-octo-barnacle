import { createModule, gql } from "graphql-modules";
import { Trip } from "../../../mongo-models/TaxiZone.js";

export const type2Module = createModule({
  id: "type-2-module-query-3",
  dirname: __dirname,
  typeDefs: gql`
    extend type Query {
      getRandom5(date: String!, LocationID: Int!): [TripTypeWithLookup]
    }
  `,
  resolvers: {
    Query: {
      getRandom5: async (_, { date, LocationID }) => {
        const lteDate = new Date(date);
        lteDate.setDate(new Date(date).getDate() + 1);
        const data = await Trip.aggregate([
          {
            $match: {
              $and: [
                {
                  tpep_pickup_datetime: {
                    $gte: new Date(date),
                    $lt: lteDate,
                  },
                },
                {
                  PULocationID: {
                    $eq: LocationID,
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: "taxizones",
              localField: "PULocationID",
              foreignField: "LocationID",
              as: "lookup_result",
            },
          },
          { $sample: { size: 5 } },
        ]);
        return data;
      },
    },
  },
});
