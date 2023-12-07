const authController = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verifytoken", authController.verifyToken);

module.exports = router;
