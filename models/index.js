import Sequalize from 'sequelize';

const sqlz = new Sequalize('nodejs18', 'dany', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5434'
});

const Product = sqlz.import('./product');
const User = sqlz.import('./user');

export { User, Product };
