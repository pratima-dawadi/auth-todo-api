import Joi from "joi";

export const createUserBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .required()
    .min(8)
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "password.uppercase":
        "Password must contain at least one uppercase letter",
      "password.special":
        "Password must contain at least one special character",
      "passwod.lowercase":
        "Password must contain at least one lowercase letter",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }

      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
}).options({ stripUnknown: true });

export const updateUserBodySchema = Joi.object({
  name: Joi.string(),

  email: Joi.string().email().messages({
    "string.email": "Email must be a valid email",
  }),

  password: Joi.string()
    .min(8)
    .messages({
      "string.min": "Password must be at least 8 characters",
      "password.uppercase":
        "Password must contain at least one uppercase letter",
      "password.special":
        "Password must contain at least one special character",
      "passwod.lowercase":
        "Password must contain at least one lowercase letter",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }

      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
}).options({ stripUnknown: true });

export const getUserQuerySchema = Joi.object({
  q: Joi.string().optional(),
  page: Joi.number().optional().messages({
    "number.base": "Page must be a number",
  }),
}).options({ stripUnknown: true });
