'use strict';
const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const userSchema = new Schema({
  name:  String,
  weight: Number,
  age: Number
});

module.exports = mongoose.model('User', userSchema);

// module.exports = (sequelize, DataTypes) => {
//   var user = sequelize.define('user', {
//     name: DataTypes.STRING,
//     weight: DataTypes.FLOAT,
//     age: DataTypes.FLOAT
//   }, {});
//   user.associate = function(models) {
//     // associations can be defined here
//   };
//   return user;
// };
