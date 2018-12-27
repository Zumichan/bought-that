const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Grocery Shopping List");
});

module.exports = router;
