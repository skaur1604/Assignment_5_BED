import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const validate = (
  schema: Joi.ObjectSchema,
  property: "body" | "query" | "params" = "body") => {
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = schema.validateAsync(req[property], {
        abortEarly: false,
        stripUnknown: true,
      });

      req[property] = value;

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
