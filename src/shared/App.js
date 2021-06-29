
import { css } from '@emotion/react';

import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router';
import { Container } from '@material-ui/core';

import Navigation from './components/Navigation';
import ThemeProvider from './theme';

import Depot from './pages/Depot';
import Roster from './pages/Roster';
import Settings from './pages/Settings';


export default function App() {
  return <ThemeProvider>
    <Helmet
      defaultTitle="Arknights Planner"
      titleTemplate="Arknights Planner - %s"
    />
    <Helmet>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>

    <Navigation />
    <Container
      component="main"
      maxWidth="lg"
      disableGutters
      css={(t) => css `
        margin: ${t.spacing(1, 'auto')};
        ${t.breakpoints.up('sm')} {
          margin: ${t.spacing(2, 'auto')};
        }
      `}
    >
      <Switch>
        <Route path="/depot">
          <Helmet><title>Depot</title></Helmet>
          <Depot />
        </Route>
        <Route path="/roster">
          <Helmet><title>Roster</title></Helmet>
          <Roster />
        </Route>

        <Route path="/settings">
          <Helmet><title>Settings</title></Helmet>
          <Settings />
        </Route>
      </Switch>
    </Container>
  </ThemeProvider>;
}
