#!/usr/bin/env node
/* eslint-env node */

const { readFileSync: read, writeFileSync: write } = require('fs');
const { parse, stringify } = JSON;

const file = process.argv[2];
if( !file ) {
  console.error('Invalid file.');
  process.exit(1);
}

write(file, stringify(parse(read(file))));
