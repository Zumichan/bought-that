'use strict';
module.exports = (sequelize, DataTypes) => {
  const Grocery = sequelize.define('Grocery', {
    item: DataTypes.STRING
  }, {});
  Grocery.associate = function(models) {
    // associations can be defined here
  };
  return Grocery;
};