// src/app/api/graphql/route.ts
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs, resolvers } from "@/graphql";
import dbconnect from "@/lib/mongodb";



const server = new ApolloServer({ typeDefs, resolvers });


const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    await dbconnect(); // ⬅️ Always ensure DB is connected
    return {};
  },
});

export { handler as GET, handler as POST };
