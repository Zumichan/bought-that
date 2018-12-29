const statusQueries = require("../db/queries.statuses.js");

module.exports = {
  create(req, res, next){
    if(req.user){
      statusQueries.createStatus(req, (err, status) => {
        if(err){
          req.flash("error", err);
        }
      });
    } else {
      req.flash("notice", "You must be signed in to do that.")
    }
    res.redirect(req.headers.referer);
  },

  destroy(req, res, next){
    if(req.user){
      statusQueries.deleteStatus(req, (err, status) => {
        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "You must be signed in to do that.")
      res.redirect(req.headers.referer);
    }
  }
}
