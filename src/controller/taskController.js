const tasksData = require("../../task.json");
const {
  taskValidationSchema,
  taskUpdationValidationSchema,
} = require("../utils/taskValidation");
const tasks = tasksData?.tasks ?? [];

const createTask = (req, res, next) => {
  const { error } = taskValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Title or Description is missing.",
    });
  }
  const newTask = {
    id: tasks?.length + 1,
    title: req.body?.title,
    description: req.body?.description,
    completed: req.body?.completed ?? false,
  };

  tasks.push(newTask);

  return res.status(201).json({
    success: true,
    message: "Task created successfully",
  });
};

const getTasks = (req, res, next) => {
  return res.status(200).json(tasks);
};

const getTask = (req, res, next) => {
  const id = +req.params.id;
  const task = tasks?.find((task) => task.id === id);
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Invalid task",
    });
  }

  return res.status(200).json(task);
};

const updateTask = (req, res, next) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Id",
    });
  }
  // Schema validation
  const { error } = taskUpdationValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
    });
  }

  let task = tasks?.find((task) => task.id === id);
  // If there is no such task
  if (!task) {
    return res.status(404).json({
      success: false,
      message: `There is no such task with id ${id} to update`,
    });
  }

  // Updating the task
  task = {
    ...task,
    ...req.body,
  };

  return res.status(200).json(task);
};

const deleteTask = (req, res, next) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Id",
    });
  }
  let taskIndex = tasks?.findIndex((task) => task.id === id);
  // If there is no such task
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `There is no such task with id ${id} to update`,
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  return res.status(200).json(deletedTask);
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
