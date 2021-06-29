
import { DataTypes } from 'sequelize';
import Model from './Model';
import sequelize from '../db';

import I18N from './I18N';
import User from './User';
// import Skill from './Skill';
// import Upgrade from './Upgrade';


export const OperatorKind = DataTypes.ENUM([
  'CASTER',
  'DEFENDER',
  'GUARD',
  'MEDIC',
  'SNIPER',
  'SPECIALIST',
  'SUPPORTER',
  'VANGUARD',
]);


export class Operator extends Model {
  static ID_TYPE = DataTypes.STRING;

  static include() {
    // return [{
    //   association: Operator.Skills,
    //   include: Skill.include(),
    // }, {
    //   association: Operator.Upgrades,
    //   include: Upgrade.include(),
    // }];
  }

  async getOwned(user_id) {
    const user = await this.lazy('getUsers', { where: { user_id } });
    const owned = user[0].OwnedOperator;
    return {
      owned: owned.owned,
      elite: owned.elite,
      level: owned.level,
      skill: owned.skill,
      trust: owned.trust,
      potential: owned.potential,

      mastery: owned.Skills
        .map(({ OwnedOperatorSkill }) => OwnedOperatorSkill)
        .map(({ skill_id, level }) => ({ skill_id, level })),
    };
  }
}

Operator.init({
  id: {
    type: Operator.ID_TYPE,
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
    allowNull: false,
  },
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  kind: {
    type: OperatorKind,
    allowNull: false,
  },

  name_i18n: I18N.column('Name', 'name_i18n'),
}, {
  sequelize,
});

export const OperatorName = I18N.define(Operator, 'Name');


// export class OperatorSkill extends Model {}
// OperatorSkill.init({
//   operator_id: {
//     type: Operator.ID_TYPE,
//     references: { model: Operator, key: 'id' },
//   },
//   skill_id: {
//     type: Skill.ID_TYPE,
//     references: { model: Skill, key: 'id' },
//   },

//   index: {
//     type: DataTypes.ENUM(1, 2, 3),
//     allowNull: false,
//   },
// }, {
//   sequelize,
//   timestamps: false,
//   underscored: true,
//   indexes: [{
//     unique: true,
//     fields: [ 'operator_id', 'skill_id' ],
//   }, {
//     unique: true,
//     fields: [ 'operator_id', 'index' ],
//   }],
// });
// Skill.Operators = Skill.belongsToMany(Operator, { through: OperatorSkill });
// Operator.Skills = Operator.belongsToMany(Skill, { through: OperatorSkill });


// export class OperatorUpgrade extends Model {}
// OperatorUpgrade.init({
//   operator_id: {
//     type: DataTypes.STRING,
//     references: { model: Operator, key: 'id' },
//     unique: 'operator_id_upgrade_id',
//     allowNull: false,
//   },
//   upgrade_id: {
//     type: DataTypes.INTEGER,
//     references: { model: Upgrade, key: 'id' },
//     unique: 'operator_id_upgrade_id',
//     allowNull: false,
//   },
// }, {
//   sequelize,
//   timestamps: false,
//   underscored: true,
// });

// Upgrade.Operators = Upgrade.belongsToMany(Operator, { through: OperatorUpgrade });
// Operator.Upgrades = Operator.belongsToMany(Upgrade, { through: OperatorUpgrade });


export class OwnedOperator extends Model {
  static ID_TYPE = DataTypes.INTEGER;

  // static include() {
  //   return [{
  //     model: Skill,
  //     include: Skill.include(),
  //   }];
  // }
}
OwnedOperator.init({
  id: {
    type: OwnedOperator.ID_TYPE,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  user_id: {
    type: User.ID_TYPE,
    references: { model: User, key: 'id' },
    unique: 'user_id_operator_id',
    allowNull: false,
  },
  operator_id: {
    type: Operator.ID_TYPE,
    references: { model: Operator, key: 'id' },
    unique: 'user_id_operator_id',
    allowNull: false,
  },

  owned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  elite: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },

  skill: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },

  trust: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  potential: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  sequelize,
});
User.Operators = User.belongsToMany(Operator, { through: OwnedOperator });
Operator.Users = Operator.belongsToMany(User, { through: OwnedOperator });


// export class OwnedOperatorSkill extends Model {}
// OwnedOperatorSkill.init({
//   owned_operator_id: {
//     type: DataTypes.INTEGER,
//     references: { model: OwnedOperator, key: 'id' },
//     unique: 'owned_operator_id_skill_id',
//   },
//   skill_id: {
//     type: DataTypes.INTEGER,
//     references: { model: Skill, key: 'id' },
//     unique: 'owned_operator_id_skill_id',
//   },

//   level: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0,
//   },
// }, {
//   sequelize,
//   timestamps: false,
//   underscored: true,
// });
// OwnedOperator.Skills = OwnedOperator.belongsToMany(Skill, { through: OwnedOperatorSkill });
// Skill.OwnedOperators = Skill.belongsToMany(OwnedOperator, { through: OwnedOperatorSkill });

export default Operator;
