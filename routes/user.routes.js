const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/authState.middleware");
const router = require("express").Router();

router.get("/user", verifyToken, userController.getUserById);

module.exports = router;
