const taskController = require("../controllers/task.controller");
const { verifyToken } = require("../middlewares/authState.middleware");
const router = require("express").Router();

router.post("/create-task", verifyToken, taskController.createTask);
router.get("/tasks", verifyToken, taskController.getAllTaskOfSingleUser);
router.get("/task/:id", verifyToken, taskController.getTaskById);
router.put("/update-task/:id", verifyToken, taskController.updateTask);
router.delete("/delete-task/:id", verifyToken, taskController.deleteTask);

module.exports = router;
