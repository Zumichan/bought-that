'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    groceryId: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
   userId: {
     type: DataTypes.INTEGER,
     allowNull: false
   }
  }, {});
  Status.associate = function(models) {
    Status.belongsTo(models.Grocery, {
     foreignKey: "groceryId",
     onDelete: "CASCADE"
   });

    Status.belongsTo(models.User, {
     foreignKey: "userId",
     onDelete: "CASCADE"
   });
  };
  return Status;
};
