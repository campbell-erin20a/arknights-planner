
import { DataTypes } from 'sequelize';
import Model from './Model';
import sequelize from '../db';

import I18N from './I18N';


export const ActivationKind = DataTypes.ENUM([
  'PASSIVE',
  'MANUAL',
  'AUTOMATIC',
]);
export const RecoveryKind = DataTypes.ENUM([
  'PASSIVE',
  'PER_SECOND',
  'OFFENSIVE',
  'DEFENSIVE',
]);


export default class Skill extends Model {
  static include(user_id) {
    return [{
      model: SkillLevel,
      include: SkillLevel.include(user_id),
    }];
  }
}
Skill.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  activation: {
    type: ActivationKind,
    allowNull: false,
  },
  recovery: {
    type: RecoveryKind,
    allowNull: false,
  },

  ...I18N.column('Name', 'name'),
}, {
  sequelize,
  timestamps: false,
  underscored: true,
});

export const SkillName = I18N.define(Skill, 'Name');


export class SkillLevel extends Model {

}
SkillLevel.init({
  skill_id: {
    type: DataTypes.INTEGER,
    references: { model: Skill, key: 'id' },
    allowNull: false,
    unique: 'skill_id_level',
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: 'skill_id_level',
  },

  sp: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  initial: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  ...I18N.column('Text', 'text'),
}, {
  sequelize,
  timestamps: false,
  underscored: true,
});

export const SkillLevelText = I18N.define(SkillLevel, 'Text');

Skill.SkillLevels = Skill.hasMany(SkillLevel);
SkillLevel.Skill = SkillLevel.belongsTo(Skill);
