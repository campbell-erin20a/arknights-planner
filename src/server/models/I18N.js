
import { DataTypes } from 'sequelize';
import sequelize from '../db';


export const Language = DataTypes.ENUM([
  'en',
  'ja',
  'ko',
  'ru',
  'zh',
]);


export default {
  define: (BaseModel, as) => {
    const modelName = `${BaseModel.name}${as}`;
    const I18NModel = sequelize.define(modelName, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },

      language: {
        type: Language,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      timestamps: false,
      indexes: [{
        unique: true,
        fields: [ 'base_id', 'language' ],
      }],
    });

    const association = `${as}I18N`;
    BaseModel[association] = BaseModel.hasMany(I18NModel, { foreignKey: 'base_id', as });
    I18NModel.BaseModel = I18NModel.belongsTo(BaseModel, { foreignKey: 'base_id' });

    const i18n_include = [{ association: BaseModel[association] }];
    if( BaseModel.include ) {
      const include = BaseModel.include;
      BaseModel.include = function(...args) {
        return include.apply(this, args).concat(i18n_include);
      };
    } else {
      BaseModel.include = function() {
        return i18n_include;
      };
    }

    return I18NModel;
  },

  column: (as, column = '<i18n>') => {
    return {
      type: DataTypes.VIRTUAL,
      get() {
        if( this._i18n_value == null ) {
          this._i18n_value = {};
          for( const { language, value } of this[as] ) {
            this._i18n_value[language] = value;
          }
        }
        return this._i18n_value;
      },
      set() {
        throw new Error(`Invalid operation "set" on field "${this.name}.${column}".`);
      },
    };
  },
}
