
import { Sequelize } from 'sequelize';


export default new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3',
  logging: (message_, query_) => {},
  define: {
    timestamps: false,
  },
});
