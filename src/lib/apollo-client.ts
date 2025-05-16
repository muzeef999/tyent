// src/lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'api/v1/graphql', 
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});

export default client;
