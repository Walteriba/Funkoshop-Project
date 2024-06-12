const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.get("/login", authControllers.loginGET);
router.get("/register", authControllers.registerGET);
router.get("/logout", authControllers.logoutGET);

router.post("/login", authControllers.loginPOST); 
router.post("/register", authControllers.registerPOST);

module.exports = router;