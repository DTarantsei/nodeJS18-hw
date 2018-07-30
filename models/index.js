// import Sequalize from 'sequelize';
// const sqlz = new Sequalize('nodejs18', 'dany', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: '5434'
// });
// const Product = sqlz.import('./product');
// const User = sqlz.import('./user');

const User = require('./User');
const Product = require('./product');
const City = require('./City');

export { User, Product, City };
