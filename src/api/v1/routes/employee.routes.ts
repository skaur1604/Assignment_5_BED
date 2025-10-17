import express, { Router } from "express";
import { validate } from '../middleware/validate';
import { createEmployeeSchema } from '../Validation/employeeValidation';

import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} from "../controllers/employee.controller";

const router: Router = express.Router();

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/", validate(createEmployeeSchema), createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);


export default router;



