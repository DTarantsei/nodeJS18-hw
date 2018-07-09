'use strict';
module.exports = (sequelize, DataTypes) => {
  var product = sequelize.define('product', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};