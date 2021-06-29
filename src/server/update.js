
import path from 'path';
import fs from 'fs/promises';
import express from 'express';

import { Item, ItemName, OwnedItem } from './models';


async function readdir(dir) {
  const root = path.resolve(__dirname, '../game-data/', dir);
  const names = await fs.readdir(root);
  const files = await Promise.all(names.map((name) => fs.readFile(path.join(root, name))));
  return [].concat(...files.map((file) => JSON.parse(file)));
}


async function updateItems({ truncate, drop }) {
  if( truncate ) {
    await Promise.all([
      Item.truncate(),
      ItemName.truncate(),
      OwnedItem.truncate(),
    ]);
  }
  if( drop ) {
    await Promise.all([
      Item.drop(),
      ItemName.drop(),
      OwnedItem.drop(),
    ]);
  }
  await Promise.all([
    Item.sync(),
    ItemName.sync(),
    OwnedItem.sync(),
  ]);

  const json = await readdir('items');
  const items = await Promise.all(json.map(async (json) => {
    const values = {
      id: json.id,
      game_id: json.game_id,
      global: json.global,

      visible: json.visible,
      sort: json.sort,
      scale: json.scale,

      tier: json.tier,
      kind: json.kind,
      operatorKind: json.operator,

      Names: Object.entries(json.name).map(([ language, value ]) => ({
        base_id: json.id,
        language,
        value,
      })),
    };

    let item = await Item.findByPk(values.id, { include: [ Item.NamesI18N ] });
    if( !item ) {
      item = Item.build(values, { include: [ Item.NamesI18N ] });
    }

    item.set(values);
    await item.save();
    await Promise.all(item.Names.map((name) => name.save()));

    return item;
  }));

  return {
    data: items,
    response: {
      success: true,
      truncate,
      drop,
      count: items.length,
    },
  }
}

async function updateOperators() {
  throw new Error('TODO: Not yet implemented, yo!');
  // return readdir('operators').then((operators) => Promise.all(
  //   operators.map(async (json) => {
  //     const values = {
  //       id: json.id,
  //       game_id: json,
  //     };
  //   })
  // ));
}


const route = express.Router();

route.get('/', async (req, res) => {
  const items = await updateItems({
    truncate: req.query?.items?.truncate != null,
    drop: req.query?.items?.drop != null,
  });

  // const operatorQuery = {};
  // const operators = await updateOperators(req.db);

  res.status(200)
    .json({
      success: items.response.success && true,
      items: items.response,
    })
    .end();
});

export default route;
