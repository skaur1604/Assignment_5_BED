import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).required(),
  position: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().lowercase().trim().required(),
  branchId: Joi.number().integer().required(),
});