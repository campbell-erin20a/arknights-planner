
import { Sequelize, DataTypes } from 'sequelize';
import Model from './Model';
import sequelize from '../db';

import { Language } from './I18N';


export const Theme = DataTypes.ENUM('DARK', 'LIGHT');

export class User extends Model {
  static ID_TYPE = DataTypes.UUID;
}
User.init({
  id: {
    type: User.ID_TYPE,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },

  language: Language,
  theme: Theme,
}, {
  sequelize,
});

export default User;
