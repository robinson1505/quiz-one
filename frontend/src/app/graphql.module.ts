import { NgModule } from "@angular/core";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client/core";

import { HttpLink } from "apollo-angular/http";
import { HttpHeaders } from "@angular/common/http";

import { Router } from "@angular/router";


const uri = "http://localhost:4000/quiz";

// Create an instance of ApolloLink that handles errors

export function createApollo(
  httpLink: HttpLink,
  router: Router
): ApolloClientOptions<any> {
  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("token");
    if (token) {
      operation.setContext({
        headers: new HttpHeaders().set("Authorization", JSON.parse(token)),
      });
    }

    return forward(operation);
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        console.log("GRAPHQL ERRORS", error.extensions["code"]);
        if (
          error.extensions["code"] === "UNAUTHENTICATED" ||
          error.extensions["code"] === "TOKEN_EXPIRED"
        ) {
          router.navigate(["/"]);
        }
      }
    }

    console.log("NETWORK ERRORS", networkError);
    console.log("NETWORK ERRORS CAUSE", networkError?.name);
    if (networkError?.name === "HttpErrorResponse") {
      router.navigate(["/"]);
    }
  });

  const link = ApolloLink.from([
    authMiddleware,
    errorLink,
    httpLink.create({ uri, withCredentials: true }),
  ]);
  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, Router],
    },
  ],
})
export class GraphQLModule {}