const taskRepository = require("../repositories/task.repository");
const STATUS = require("../constant/status.constant");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;
    const newTask = {
      title,
      description,
      user: userId,
    };
    const task = await taskRepository.createTask(newTask);
    if (!task)
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Create task failed",
      });
    return res.status(STATUS.CREATED).json({
      message: "Create task successfully",
    });
  } catch (err) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await taskRepository.getTaskById(taskId);
    if (!task)
      return res.status(STATUS.NOT_FOUND).json({
        message: "Task does not exist",
      });
    return res.status(STATUS.SUCCESS).json({
      task,
    });
  } catch (err) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

const getAllTaskOfSingleUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const tasks = await taskRepository.getAllTaskOfSingleUser(userId);
    if (!tasks)
      return res.status(STATUS.NOT_FOUND).json({
        message: "Task does not exist",
      });
    return res.status(STATUS.SUCCESS).json({
      tasks,
    });
  } catch (err) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;
    const isTaskExited = await taskRepository.getTaskById(taskId);
    if (!isTaskExited)
      return res.status(STATUS.NOT_FOUND).json({
        message: "Task does not exist",
      });
    if (isTaskExited.user.toString() !== userId)
      return res.status(STATUS.FORBIDDEN).json({
        message: "You are not allowed to update this task",
      });

    const task = await taskRepository.updateTask(taskId, {
      completed: true,
    });
    if (!task)
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Update task failed",
      });
    return res.status(STATUS.SUCCESS).json({
      message: "Update task successfully",
    });
  } catch (err) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;
    const isTaskExited = await taskRepository.getTaskById(taskId);
    if (!isTaskExited)
      return res.status(STATUS.NOT_FOUND).json({
        message: "Task does not exist",
      });
    if (isTaskExited.user.toString() !== userId)
      return res.status(STATUS.FORBIDDEN).json({
        message: "You are not allowed to delete this task",
      });

    const task = await taskRepository.deleteTask(taskId);
    if (!task)
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Delete task failed",
      });
    return res.status(STATUS.SUCCESS).json({
      message: "Delete task successfully",
    });
  } catch (err) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports = {
  createTask,
  getTaskById,
  getAllTaskOfSingleUser,
  updateTask,
  deleteTask,
};
