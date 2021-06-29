
import { DataTypes } from 'sequelize';
import Model from './Model';
import sequelize from '../db';

import User from './User';
import Upgrade from './Upgrade';


export default class Plan extends Model {

}

Plan.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },

  name: DataTypes.STRING,
}, {
  sequelize,
  timestamps: false,
  underscored: true,
});

User.hasMany(Plan, { foreignKey: 'user_id', as: 'plans' });
Plan.belongsTo(User);


export class PlanUpgrade extends Model {}
PlanUpgrade.init({
  plan_id: {
    type: DataTypes.INTEGER,
    references: { model: Plan, key: 'id' },
    allowNull: false,
    unique: 'plan_id_upgrade_id',
  },
  upgrade_id: {
    type: DataTypes.INTEGER,
    references: { model: Upgrade, key: 'id' },
    allowNull: false,
    unique: 'plan_id_upgrade_id',
  },

  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  timestamps: false,
  underscored: true,
});
Plan.belongsToMany(Upgrade, { through: PlanUpgrade });
Upgrade.belongsToMany(Plan, { through: PlanUpgrade, as: 'upgrades' });
