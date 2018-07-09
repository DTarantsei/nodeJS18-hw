'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    age: DataTypes.FLOAT
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};