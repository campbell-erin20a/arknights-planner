
import { Model as SequelizeModel } from 'sequelize';


export default class Model extends SequelizeModel {
  static include() {
    return [];
  }

  static findByPk(key, options = {}) {
    return super.findByPk(key, {
      ...options,
      include: this.include(),
    });
  }
  static findOne(options = {}) {
    return super.findOne({
      ...options,
      include: this.include(),
    });
  }
  static findAll(options = {}) {
    return super.findAll({
      ...options,
      include: this.include(),
    });
  }

  _lazyCache = new Map();
  async lazy(getter, options = {}) {
    const key = [ getter, JSON.stringify(options) ].join('-');
    if( !this._lazyCache.has(key) ) {
      this._lazyCache.set(key, this[getter](options));
    }
    return this._lazyCache.get(key);
  }
}
