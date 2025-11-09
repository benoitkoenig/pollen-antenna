import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { memo, type PropsWithChildren } from "react";

const httpLink = new HttpLink({
  uri: "/api/pollen-antenna",
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default memo(function ApolloWrapper({ children }: PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
});
