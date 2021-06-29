
import { strict as assert } from 'assert';

import paginate, { Connection, Edge } from './paginate';
import translate from './i18n';


export const Query = {
  item: (_, { id }, { db }) => db.Item.findByPk(id),
  items: (_, args_, { db }) => paginate(db.Item.findAll()),
};

export const Mutation = {
  updateItemOwned: async (_, { id, value, offset }, { db, user }) => {
    assert(id != null, 'Attempted to set Item.owned without specifying an ID.');
    assert((offset != null) || (value != null), 'Attempted to set Item.owned to null.');

    const ids = {
      user_id: user.id,
      item_id: id,
    };

    const [ owned, isNew ] = await db.OwnedItem.findOrBuild({
      where: { [db.op.and]: ids },
      defaults: ids,
    });
    if( value != null ) {
      owned.set('owned', Math.max(0, value));
      await owned.save();
    } else if( isNew ) {
      owned.set('owned', offset);
      await owned.save();
    } else {
      await owned.increment('owned', { by: offset });
    }

    return db.Item.findByPk(id);
  },
};


export const Item = {
  id: (item) => item.id,
  game_id: (item) => item.game_id,
  global: (item) => item.global,

  visible: (item) => item.visible,
  sort: (item) => item.sort,
  scale: (item) => item.scale,

  tier: (item) => item.tier,
  kind: (item) => item.kind,
  operator: (item) => item.operatorKind,

  name: translate('name_i18n'),
  name_i18n: (item) => item.name_i18n,

  owned: (item, args, { user }) => item.lazy('getOwned', { user_id: user.id }),
};

export const ItemConnection = Connection;
export const ItemEdge = Edge;

export const ItemCount = {
  count: (count) => count.count,
  item: (count) => count.item,
}
