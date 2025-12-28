const Joi = require("joi");

const taskValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(1000).required(),
  completed: Joi.boolean().default(false),
  priority: Joi.string()
    .valid('HIGH', 'MEDIUM', 'LOW')
    .default('MEDIUM')
    .messages({
      'any.only': 'Priority must be: HIGH, MEDIUM, LOW'
    }),
});

const taskUpdationValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(5).max(1000),
  completed: Joi.boolean().strict(),
  priority: Joi.string()
    .valid('HIGH', 'MEDIUM', 'LOW')
    .messages({
      'any.only': 'Priority must be: HIGH, MEDIUM, LOW'
    }),
}).min(1)

module.exports = {
  taskValidationSchema,
  taskUpdationValidationSchema,
};
