import { createModule, gql } from "graphql-modules";
import { Trip } from "../../../mongo-models/TaxiZone.js";

export const type2Module = createModule({
  id: "type-2-module-query-2",
  dirname: __dirname,
  typeDefs: gql`
    type CustomDateID {
      custom_id: Date
      dateString: String
    }

    type DailyAvarageType {
      _id: CustomDateID
      avarageTotalAmount: DoubleType
    }

    extend type Query {
      getDailyAvarage(sortType: String): [DailyAvarageType]
    }
  `,
  resolvers: {
    Query: {
      getDailyAvarage: (_, { sortType }) => {
        const data = Trip.aggregate([
          {
            $group: {
              _id: {
                custom_id: "$tpep_pickup_datetime",
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%d %H:%M:%S",
                    date: "$tpep_pickup_datetime",
                  },
                },
              },
              avarageTotalAmount: {
                $avg: "$total_amount",
              },
            },
          },
        ])
          .allowDiskUse(true)
          .sort({ avarageTotalAmount: sortType })
          .limit(2);
        return data;
      },
    },
  },
});
