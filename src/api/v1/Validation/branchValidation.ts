import Joi from "joi";

export const branchCreateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  address: Joi.string().trim().min(10).max(200).required(),
  phone: Joi.string()
  .trim()
  .pattern(/^\+?[0-9\s\-()]{8,25}$/)
  .required(),
});
