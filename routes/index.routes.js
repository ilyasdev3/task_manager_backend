const router = require("express").Router();
const authRoutes = require("./auth.routes");
const taskRoutes = require("./task.routes");
const userRoutes = require("./user.routes");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/task", taskRoutes);

module.exports = router;
