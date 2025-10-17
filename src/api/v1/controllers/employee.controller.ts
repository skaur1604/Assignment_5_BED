import { Request, Response } from "express";
import * as employeeService from "../services/employee.service";
import { Employee } from "../services/employee.service";

export const getAllEmployees = (req: Request, res: Response): Response => {
  const employees: Employee[] = employeeService.getAll();
  return res.status(200).json(employees);
};

export function createEmployee(req: Request, res: Response): Response {
  const { name, position, department, email, phone, branchId } = req.body;

  if (!name || !position || !department) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newEmployee = employeeService.create({
    name,
    position,
    department,
    email,
    phone,
    branchId,
  });

  return res.status(201).json(newEmployee);
}

export const updateEmployee = (req: Request, res: Response): Response => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No update data provided" });
  }

  const updated = employeeService.update(id, updates);
  if (!updated) {
    return res.status(404).json({ message: "Employee not found" });
  }

  return res.status(200).json({ data: updated });
};

export const deleteEmployee = (req: Request, res: Response): Response => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

  const deleted: boolean = employeeService.remove(id);
  if (!deleted) {
    return res.status(404).json({ message: "Employee not found" });
  }
  return res.status(200).json({ message: "Employee deleted" });
};

export const getEmployeeById = (req: Request, res: Response): Response => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

  const employee: Employee | undefined = employeeService.getById(id);
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  return res.status(200).json({ message: "Fetched employee by ID", data: employee });
};



