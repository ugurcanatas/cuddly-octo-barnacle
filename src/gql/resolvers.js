import { TaxiZone, Trip } from "../mongo-models/TaxiZone.js";
import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

export const resolvers = {
  Date: dateScalar,
  Query: {
    taxizones: () => TaxiZone.find(),
    getTaxiServiceZone: (_, args) => {
      const { service_zone } = args;
      return TaxiZone.findOne({ service_zone });
    },
    trips: (_, args) => {
      const { tip_amount } = args;
      return Trip.find().sort({ tip_amout: -1 }).limit(10);
    },
  },
  Mutation: {
    insertTaxiZone: (_, { LocationID, Borough, Zone, service_zone }) => {
      return new TaxiZone({
        LocationID,
        Borough,
        Zone,
        service_zone,
      }).save();
    },
  },
};
