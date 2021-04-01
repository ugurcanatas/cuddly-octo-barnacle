import { GraphQLScalarType, Kind } from "graphql";

export const doubleScalar = new GraphQLScalarType({
  name: "DoubleType",
  description: "DoubleType custom scalar type",
  serialize(value) {
    //console.log("SERIALIZE", value);
    return parseFloat(value); // Convert outgoing Date to integer for JSON
  },
  parseLiteral(ast) {
    console.log("PARSE LITERAL", ast);
    if (ast.kind == Kind.FLOAT) {
      return parseFloat(ast.value, 16);
    }
    return null;
  },
  parseValue(value) {
    console.log("DOUBLE SCALAR VALUE", value);
    return value;
  },
});
