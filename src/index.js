import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer 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`
      }
    });
  }
});

render(
  <ApolloProvider client={client}>    
    <App />    
  </ApolloProvider>,
  document.getElementById("root")
);