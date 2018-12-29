const User = require("./models").User;
const Status = require("./models").Status;

module.exports = {

  createStatus(req, callback){
    return Status.create({
      groceryId: req.params.groceryId,
      userId: req.user.id
    })
    .then((status) => {
      callback(null, status);
    })
    .catch((err) => {
      callback(err);
    });
  },
  deleteStatus(req, callback){
    const id = req.params.id;

    return Status.findById(id)
    .then((status) => {

      if(!status){
        return callback("Status not found");
      }

        Status.destroy({ where: { id }})
        .then((deletedRecordsCount) => {
          callback(null, deletedRecordsCount);
        })
        .catch((err) => {
          callback(err);
        })
    })
    .catch((err) => {
      callback(err);
    });
  }
}
