const express = require("express");
const router = express.Router();
const shopControllers = require("../controllers/shopControllers");

router.get("/", shopControllers.shopGET);
router.get("/item/:id", shopControllers.itemGET);
router.get("/cart", shopControllers.cartGET);

router.post("/item/add/:id", shopControllers.itemPOST);
router.post("/cartupdate", shopControllers.cartUpdatePOST);
router.post("/cartupdate/delete/:id", shopControllers.cartDeleteItem);
router.post("/cart", shopControllers.cartPOST);

module.exports = router;
