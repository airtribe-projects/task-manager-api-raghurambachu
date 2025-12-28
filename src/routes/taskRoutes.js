const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTasksBasedOnPriority,
} = require("../controller/taskController");
const router = express.Router();

// Create Task
router.post("/", createTask);

// Get Tasks
router.get("/", getTasks);

// Get Tasks based on priority
router.get("/priority/:level", getTasksBasedOnPriority);

// Get Task
router.get("/:id", getTask);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

module.exports = router;
