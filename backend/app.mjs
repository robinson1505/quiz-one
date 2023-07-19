import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import typeDefs from "./app/schemas/index.js";
import resolvers from "./app/resolvers/index.js";
import context from "./app/context/context.js";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

const httpServer = http.createServer(app);

// const wsServer = new WebSocketServer({
//   server: httpServer,
//   path: "/quiz",
// });
// const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  includeStacktraceInErrorResponses: false,
  introspection: true,
  // plugins: [
  //   ApolloServerPluginDrainHttpServer({ httpServer }),
  //   {
  //     async serverWillStart() {
  //       console.log("SUBSCRIPTION SERVER IS UP")
  //       return {
  //         async drainServer() {
  //           await serverCleanup.dispose();
  //         },
  //       };
  //     },
  //   },
  // ],
 
});

// const wsServer = new WebSocketServer({ port: 4000 });
// wsServer.on('connection', (ws) => {
//   server(ws);
// });

// const wsServer = new WebSocketServer({ server: httpServer });

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
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/quiz  🙋🙋`);
