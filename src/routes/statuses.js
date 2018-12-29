const express = require("express");
const router = express.Router();

const statusController = require("../controllers/statusController");

router.post("/groceries/<%= grocery.groceryId %>/statuses/<%= status.id %>/create",
  statusController.create);

router.post("/groceries/<%= grocery.groceryId %>/statuses/<%= status.id %>/destroy",
  statusController.destroy);

module.exports = router;
