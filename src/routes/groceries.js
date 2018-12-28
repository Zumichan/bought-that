const express = require("express");
const router = express.Router();

const groceryController = require("../controllers/groceryController")

router.get("/groceries", groceryController.index);
router.get("/groceries/new", groceryController.new);
router.post("/groceries/create", groceryController.create);
router.get("/groceries/:id", groceryController.show);
router.post("/groceries/:id/destroy", groceryController.destroy);
router.get("/groceries/:id/edit", groceryController.edit);
router.post("/groceries/:id/update", groceryController.update);

module.exports = router;
