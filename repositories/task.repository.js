const Task = require("../models/Task.model");

const getAllTaskOfSingleUser = async (userId) => {
  try {
    const tasks = await Task.find({ user: userId });
    return tasks;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getTaskById = async (id) => {
  try {
    const task = await Task.findById(id);
    return task;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createTask = async (task) => {
  try {
    const newTask = new Task(task);
    const savedTask = await newTask.save();
    return savedTask;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateTask = async (id, task) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(id, task, {
      new: true,
    });
    return updateTask;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteTask = async (id) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAllTaskOfSingleUser,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
