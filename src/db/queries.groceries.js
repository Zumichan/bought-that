const Grocery = require("./models").Grocery;

module.exports = {

  getAllGroceries(callback){
    return Grocery.findAll()
    .then((groceries) => {
      callback(null, groceries);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addGrocery(newGrocery, callback){
    return Grocery.create({
      item: newGrocery.item,
    })
    .then((grocery) => {
      callback(null, grocery);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getGrocery(id, callback){
     return Grocery.findByPk(id)
     .then((grocery) => {
       callback(null, grocery);
     })
     .catch((err) => {
       callback(err);
     })
   },
   deleteGrocery(id, callback){
     return Grocery.destroy({
       where: {id}
     })
     .then((grocery) => {
       callback(null, grocery);
     })
     .catch((err) => {
       callback(err);
     })
   },
   updateGrocery(req, updatedGrocery, callback){
    return Grocery.findById(req.params.id)
    .then((grocery) => {
      if(!grocery){
        return callback("Item not found");
      }
      grocery.update(updatedGrocery, {
        fields: Object.keys(updatedGrocery)
      })
      .then(() => {
        callback(null, grocery);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }

}
