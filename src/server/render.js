
import express from 'express';

import { ApolloProvider } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';


import { ServerStyleSheets } from '@material-ui/core/styles';

import { I18nextProvider } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';

import App from '@shared/App';
import { createClient } from './graphql';
import template from './template';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);


const route = express.Router();

route.get('/*', async (req, res) => {
  const context = {};

  const client = createClient(req);

  const sheets = new ServerStyleSheets();
  const html = await getDataFromTree(
    sheets.collect(
      <I18nextProvider i18n={req.i18n}>
        <ApolloProvider client={client}>
          <HelmetProvider context={context}>
            <StaticRouter context={context} location={req.path}>
              <App />
            </StaticRouter>
          </HelmetProvider>
        </ApolloProvider>
      </I18nextProvider>
    )
  );

  if( context.url ) {
    res.redirect(context.url);
    return;
  }

  res.status(200);
  template({
    helmet: context.helmet,
    css: assets.client.css,
    style: sheets.toString(),
    scripts: assets.client.js,
    state: client.extract(),
    i18n: {
      store: req.i18n.store,
      language: req.user.language,
    },
    body: html,
  }).pipe(res);
});

export default route;
