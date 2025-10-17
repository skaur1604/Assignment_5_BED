import express, { Router } from "express";
import * as employeeController from '../controllers/employee.controller';
import { validate } from "../middleware/validate";
import { createEmployeeSchema } from "../Validation/employeeValidation";

import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} from "../controllers/employee.controller";

const router: Router = express.Router();

router.get("/employees", getAllEmployees);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);
router.get("/employees/:id", getEmployeeById);

router.post('/create', employeeController.createEmployee);



export default router;



