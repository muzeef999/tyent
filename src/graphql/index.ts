// src/graphql/index.ts
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { customerTypeDefs } from "./schema/customer";
import { customerResolvers } from "./resolvers/customer";

const typeDefs = mergeTypeDefs([
  `#graphql
    type Query
    type Mutation
  `,
  customerTypeDefs,
]);

const resolvers = mergeResolvers([customerResolvers]);

export { typeDefs, resolvers };
