import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, BrowserRouter, Switch} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import App from './js/components/App';
import NotFound from './js/components/NotFound';
import {store, client} from './config';

ReactDOM.render((
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
), document.getElementById('root'));
