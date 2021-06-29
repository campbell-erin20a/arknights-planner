
import { render, hydrate } from 'react-dom';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import initI18next from './i18n';

import { APOLLO_STATE_KEY, I18N_STATE_KEY } from '@shared/config';

import Root from './Root';


const i18nState = window[I18N_STATE_KEY];
delete window[I18N_STATE_KEY];
initI18next();


const cache = new InMemoryCache();
cache.restore(window[APOLLO_STATE_KEY]);
delete window[APOLLO_STATE_KEY];

const client = new ApolloClient({
  uri: '/graphql',
  ssrForceFetchDelay: 100,
  cache,
});


const dom = (fn) => fn(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <BrowserRouter>
        <Root i18nState={i18nState} />
      </BrowserRouter>
    </HelmetProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
dom(hydrate);

if (module.hot) {
  module.hot.accept('./Root', () => dom(render));
}
