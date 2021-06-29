
import { DataTypes, Op } from 'sequelize';
import Model from './Model';
import sequelize from '../db';

import I18N from './I18N';
import User from './User';
import { OperatorKind } from './Operator';


export const ItemKind = DataTypes.ENUM([
  'CURRENCY',
  'OTHER',

  'BATTLE_RECORD',
  'SKILL',
  'CHIP',

  'ALLOY',
  'CRYSTAL',
  'GEL',
  'GRINDSTONE',
  'KOHL',
  'MANGANESE',
  'RMA',

  'DEVICE',
  'ESTER',
  'IRON',
  'KETON',
  'ROCK',
  'SUGAR',
]);


export class Item extends Model {
  static ID_TYPE = DataTypes.STRING(7);

  async getOwned({ user_id }) {
    const owned = await OwnedItem.findOne({
      where: { [Op.and]: {
        item_id: this.id,
        user_id,
      } },
    });
    return owned?.owned ?? 0;
  }
}
Item.init({
  id: {
    type: Item.ID_TYPE,
    primaryKey: true,
    allowNull: false,
  },
  game_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  global: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  visible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  sort: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  scale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  tier: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  kind: {
    type: ItemKind,
    allowNull: false,
  },
  operatorKind: OperatorKind,

  name_i18n: I18N.column('Names', 'name_i18n'),
}, {
  sequelize,
});

export const ItemName = I18N.define(Item, 'Names');


export class OwnedItem extends Model {}
OwnedItem.init({
  user_id: {
    type: User.ID_TYPE,
    references: { model: User, key: 'id' },
    allowNull: false,
    unique: 'user_id_item_id',
  },
  item_id: {
    type: Item.ID_TYPE,
    references: { model: Item, key: 'id' },
    allowNull: false,
    unique: 'user_id_item_id',
  },

  owned: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
});
User.Items = User.belongsToMany(Item, { through: OwnedItem, foreignKey: 'user_id' });
Item.Users = Item.belongsToMany(User, { through: OwnedItem, foreignKey: 'item_id' });

export default Item;
