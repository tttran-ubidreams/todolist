import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {ApolloClient, InMemoryCache} from 'apollo-client-preset';
import {SubscriptionClient} from "subscriptions-transport-ws";
import {createHttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {split, ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import {getMainDefinition} from 'apollo-utilities';

import todoReducer from './js/reducers/reducer';

const PORT = 4000;
const URL = `http://localhost:${PORT}/graphql`;
const URL_SUBSCRIPTION = `ws://localhost:${PORT}/subscriptions`;

const wsLink = new WebSocketLink(new SubscriptionClient(URL_SUBSCRIPTION, {
  reconnect: true
}));

const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  createHttpLink({uri: URL})
);

const cache = new InMemoryCache();

const stateLink = withClientState({ cache });

export const client = new ApolloClient({
  link: ApolloLink.from([stateLink, link]),
  cache: cache,
});

export const store = createStore(
  combineReducers({
    todos: todoReducer
  }),
  applyMiddleware(thunk)
);

