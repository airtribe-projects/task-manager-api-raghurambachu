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
  const now = (new Date()).toISOString();
  const newTask = {
    id: tasks?.length + 1,
    title: req.body?.title,
    description: req.body?.description,
    completed: req.body?.completed ?? false,
    creationDate: now
  };

  tasks.push(newTask);

  return res.status(201).json({
    success: true,
    message: "Task created successfully",
  });
};

const getTasks = (req, res, next) => {
  const { completed } = req.query;
  let filteredTasks = tasks;
  const isCompleted = completed === "true";
  if (completed && isCompleted) {
    filteredTasks = filteredTasks.filter(
      (task) => task.completed === isCompleted
    );
  }

  // Tasks have been created with reverse order dates in task.json
  // so that's the reason doing b-a in sorting
  filteredTasks.sort(
    (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
  );

  return res.status(200).json(filteredTasks);
};

const getTasksBasedOnPriority = (req, res, next) => {
  const priority = req.params.level;
  const validPriorities = ["HIGH", "MEDIUM", "LOW"];
  if (!priority || !validPriorities.includes(priority)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Priority",
    });
  }

  let priorityBasedTasks = tasks;
  priorityBasedTasks = priorityBasedTasks.filter(
    (task) => task.priority === priority
  );

  return res.status(200).json(priorityBasedTasks);
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

module.exports = {
  createTask,
  getTasks,
  getTasksBasedOnPriority,
  getTask,
  updateTask,
  deleteTask,
};
