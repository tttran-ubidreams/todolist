import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import thunk from 'redux-thunk';

const PORT = 4000;
const URL = `http://localhost:${PORT}/graphql`;
const URL_SUBSCRIPTION = `ws://localhost:${PORT}/subscriptions`;

const networkInterface = createNetworkInterface({
  uri: URL,
});

const wsClient = new SubscriptionClient(URL_SUBSCRIPTION, {
  reconnect: true
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      setTimeout(next, 500);
    },
  },
]);

export const store = createStore(
  combineReducers({
    apollo: client.reducer()
  }),
  applyMiddleware(thunk)
);

