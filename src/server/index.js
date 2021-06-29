
import express from 'express';
import session from 'cookie-session';
import { DAYS } from '@shared/utils/millis';

import { USER_ID, DEFAULT_LANGUAGE } from '@shared/config';
import * as db from './models';
import i18next from './i18n';
import apollo from './graphql';

import update from './update';
import render from './render';


const app = express();
app.disable('x-powered-by');

app.use(express.static(
  process.env.RAZZLE_PUBLIC_DIR,
  { index: false }
));

app.use(express.json());
app.use(i18next());
app.use(session({
  name: 'user-session',
  secret: 'none',
  maxAge: 28 * DAYS,
}));
app.use(async (req, res, next) => {
  await db.sequelize.sync();
  req.db = db;
  next();
});

app.use(async (req, res, next) => {
  const user_id = req.query[USER_ID] ?? req.session.user_id;
  const user = user_id
    ? await req.db.User.findByPk(user_id)
    : await req.db.User.create({
        theme: null,
        locale: null,
      });
  if( user ) {
    req.session.user_id = user.id;
    req.user = user;
    next();
  } else {
    req.session = null;
    req.user = null;
    res.status(401).end('User not found.');
  }
});

app.use(async (req, res, next) => {
  req.user.theme =
    req.query.settings?.theme
    ?? req.user.theme;

  req.user.language =
    req.query.settings?.language
    ?? req.user.language
    ?? req.i18n.language?.slice?.(0, 2)
    ?? DEFAULT_LANGUAGE;

  try {
    await req.user.save();
    next();
  } catch( error ) {
    next(error);
  }
});

apollo.applyMiddleware({
  app,
  path: '/graphql',
});

app.use('/update', update);
app.use('/', render);

export default app;
