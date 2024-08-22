import Joi from "joi";

export const createTodoBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),

  description: Joi.string().max(50).required().empty().messages({
    "any.required": "Description is required",
    "string.max": "Description must be less than 50 characters",
    "string.empty": "Description cannot be empty",
  }),

  status: Joi.string().valid("completed", "incomplete").required().messages({
    "any.required": "Status is required",
    "any.only": "Status must be either 'completed' or 'incomplete'",
  }),
}).options({ stripUnknown: true });

export const updateTodoBodySchema = Joi.object({
  name: Joi.string(),

  description: Joi.string().max(50).empty().messages({
    "string.max": "Description must be less than 50 characters",
    "string.empty": "Description cannot be empty",
  }),

  status: Joi.string().valid("completed", "incomplete").messages({
    "any.only": "Status must be either 'completed' or 'incomplete'",
  }),
}).options({ stripUnknown: true });
