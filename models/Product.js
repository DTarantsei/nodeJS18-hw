'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name:  { type: String, required: true },
  brand: String,
  price: Number
});

module.exports = mongoose.model('Product', productSchema);

// module.exports = (sequelize, DataTypes) => {
//   var product = sequelize.define('product', {
//     name: DataTypes.STRING,
//     brand: DataTypes.STRING,
//     price: DataTypes.INTEGER
//   }, {});
//   product.associate = function(models) {
//     // associations can be defined here
//   };
//   return product;
// };
