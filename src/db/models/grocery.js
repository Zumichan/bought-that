'use strict';
module.exports = (sequelize, DataTypes) => {
  const Grocery = sequelize.define('Grocery', {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Grocery.associate = function(models) {
    // associations can be defined here
  };
  return Grocery;
};
