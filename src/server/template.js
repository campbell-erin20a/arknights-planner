
import { Readable } from 'stream';
import serialize from 'serialize-javascript';

import { APOLLO_STATE_KEY, I18N_STATE_KEY } from '@shared/config';


const json = (o) => serialize(o, { isJSON: true });

const cssTag = (href) => `<link rel="stylesheet" href="${href}">`;
const scriptTag = (src) =>
  process.env.NODE_ENV === 'production'
    ? `<script src="${src}" defer></script>`
    : `<script src="${src}" defer crossorigin></script>`;


const interleave = function*(a, b) {
  const al = a.length;
  const bl = b.length;
  const length = al + bl;

  let i = 0, j = 0;
  while( (i + j) < length ) {
    // Default to empty string to that null values don't result in stream end.
    if( i < al ) { yield a[i++] ?? ''; }
    if( j < bl ) { yield b[j++] ?? ''; }
  }

  // Intentionally end the stream.
  yield null;
};
const stream = (strings, ...args) =>
  new Readable({
    construct(cb) {
      this.iterator = interleave(strings, args);
      cb();
    },
    read() {
      while( this.push(this.iterator.next().value) );
    },
  });

export default function template({ helmet, css, scripts, style, state, i18n, body }) {
  return stream `
<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${css ? cssTag(css) : ''}
      <style id="mui-jss">${style}</style>
      <script>window.${APOLLO_STATE_KEY} = ${json(state)};</script>
      <script>window.${I18N_STATE_KEY} = ${json(i18n)};</script>
      ${scripts.map(scriptTag).filter(Boolean).join('\n')}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
      <div id="root">${body}</div>
  </body>
</html>`;
}
