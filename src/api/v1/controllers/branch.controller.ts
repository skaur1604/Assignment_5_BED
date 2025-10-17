import { Request, Response } from "express";
import * as svc from "../services/branch.service";

export const getAllBranches = (req: Request, res: Response) => {
  const branches = svc.list();
  res.status(200).json({ data: branches });
};

export const getBranchById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Missing or invalid id parameter" });
  }
  const branch = svc.getById(id);
  if (!branch) {
    return res.status(404).json({ message: "Branch not found" });
  }
  res.status(200).json({ data: branch });
};

export const createBranch = (req: Request, res: Response) => {
  const { name, address, phone } = req.body ?? {};
  if (!name || !address || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newBranch = svc.create({ name, address, phone });
  res.status(201).json({ message: "Branch created", data: newBranch });
};

export const updateBranch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Missing or invalid id parameter" });
  }
  const patch = { ...(req.body ?? {}) };
  if (patch.id !== undefined) delete patch.id;
  const updated = svc.update(id, patch);
  if (!updated) {
    return res.status(404).json({ message: "Branch not found" });
  }
  res.status(200).json({ message: "Branch updated", data: updated });
};

export const deleteBranch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Missing or invalid id parameter" });
  }
  const deleted = svc.remove(id);
  if (!deleted) {
    return res.status(404).json({ message: "Branch not found" });
  }
  res.status(200).json({ message: "Branch deleted" });
}; 