import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  name: Joi.string().trim().min(2).max(20).required(),
  position: Joi.string().trim().min(2).max(20).required(),
  email: Joi.string().email().lowercase().trim().required(),
  branchId: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
});