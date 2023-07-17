import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import http from "http";
import typeDefs from "./app/schemas/index.js";
import resolvers from "./app/resolvers/index.js";
import context from "./app/context/context.js";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  includeStacktraceInErrorResponses: false,
  introspection: true,
});

await server.start();
app.use(
  "/quiz",
  cors({
    origin: ["http://localhost:4200"],
    credentials: true,
  }),
  bodyParser.json(),
  expressMiddleware(server, {
    context: context,
  })
);
await new Promise((resolve) => httpServer.listen({ port: 4001 }, resolve));

console.log(`🚀 Server ready at http://localhost:4001/quiz  🙋🙋`);
