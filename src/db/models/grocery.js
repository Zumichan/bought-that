'use strict';
module.exports = (sequelize, DataTypes) => {
  const Grocery = sequelize.define('Grocery', {
    item: DataTypes.STRING
  }, {});
  Grocery.associate = function(models) {
    Grocery.hasMany(models.Status, {
     foreignKey: "groceryId",
     as: "statuses"
   });
  };
  Grocery.prototype.getStatusFor = function(userId){
     return this.statuses.find((status) => { return status.userId == userId });
   };
  return Grocery;
};
