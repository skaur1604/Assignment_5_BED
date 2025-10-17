import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const validate = (
  schema: Joi.ObjectSchema,
  part: "body" | "query" | "params" = "body") => {
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = schema.validateAsync(req[part], {
        abortEarly: false,
        stripUnknown: true,
      });
      req[part] = value;
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail: any) => detail.message),
      });
    }
  };
};
