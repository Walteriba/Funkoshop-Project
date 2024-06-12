const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");
const uploadFiles = require("../middlewares/uploadFiles");

router.get("/", adminControllers.adminGET);
router.get("/create", adminControllers.createGET);
router.get("/edit/:id", adminControllers.editGET);

router.post(
  "/create",
  uploadFiles.array("images", 2),
  adminControllers.createPOST
);
router.put(
  "/edit/:id",
  uploadFiles.array("images", 2),
  adminControllers.editPUT
);
router.delete("/delete/:id", adminControllers.editDELETE);

module.exports = router;
