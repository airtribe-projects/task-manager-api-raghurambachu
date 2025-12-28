const Joi = require("joi");

const taskValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(1000).required(),
  completed: Joi.boolean().default(false),
});

const taskUpdationValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(5).max(1000),
  completed: Joi.boolean().strict(),
}).min(1)

module.exports = {
  taskValidationSchema,
  taskUpdationValidationSchema,
};
