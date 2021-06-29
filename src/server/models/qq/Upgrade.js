
import { DataTypes } from 'sequelize';
import Model from './Model';
import sequelize from '../db';

import Skill from './Skill';
import Item from './Item';


export const UpgradeKind = DataTypes.ENUM([
  'ELITE',
  'LEVEL',
  'SKILL',
  'MASTERY',
]);


export default class Upgrade extends Model {
  static include(user_id) {
    return [{
      model: Item,
      include: Item.include(user_id),
    }];
  }
}
Upgrade.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  kind: {
    type: UpgradeKind,
    allowNull: false,
  },

  elite: DataTypes.ENUM(0, 1, 2),
  level: DataTypes.INTEGER,

  skill_id: {
    type: DataTypes.INTEGER,
    references: { model: Skill, key: 'id' },
  },

  cost: {
    type: DataTypes.VIRTUAL,
    set() { throw new Error('Invalid operation "set" on field "Upgrade.cost".'); },
    get() {
      if( !this._cost ) {
        this._cost = [];
        for( const item of this.Items ) {
          this._cost.push({ item, count: item.UpgradeCost.count });
        }
      }
      return this._cost;
    },
  },
}, {
  sequelize,
  timestamps: false,
  underscored: true,
});

Skill.Upgrades = Skill.hasMany(Upgrade, { foreignKey: 'skill_id' });
Upgrade.Skills = Upgrade.belongsTo(Skill);

export class UpgradeCost extends Model {}
UpgradeCost.init({
  item_id: {
    type: DataTypes.STRING(7),
    references: { model: Item, key: 'id' },
    allowNull: false,
    unique: 'item_id_upgrade_id',
  },
  upgrade_id: {
    type: DataTypes.INTEGER,
    references: { model: Upgrade, key: 'id' },
    allowNull: false,
    unique: 'item_id_upgrade_id',
  },

  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: false,
  underscored: true,
});
Upgrade.Items = Upgrade.belongsToMany(Item, { through: UpgradeCost });
Item.Upgrades = Item.belongsToMany(Upgrade, { through: UpgradeCost });
