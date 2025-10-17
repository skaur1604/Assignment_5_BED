import { Request, Response } from "express";
import * as branchController from "../src/api/v1/controllers/branch.controller";
import * as branchService from "../src/api/v1/services/branch.service";

describe("Branch Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getAllBranches", () => {
    it("should return all branches with status 200", () => {
      const fakeBranches = [{ id: 1, name: "Branch 1", address: "Addr", phone: "123" }];

      jest.spyOn(branchService, "list").mockReturnValue(fakeBranches);

      branchController.getAllBranches(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: fakeBranches });
    });
  });

  describe("getBranchById", () => {
    it("should return 400 if id is invalid", () => {
      req.params = { id: "abc" };

      branchController.getBranchById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Missing or invalid id parameter" });
    });

    it("should return 404 if branch not found", () => {
      req.params = { id: "999" };

      jest.spyOn(branchService, "getById").mockReturnValue(undefined);

      branchController.getBranchById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Branch not found" });
    });

    it("should return 200 with branch data if found", () => {
      const fakeBranch = { id: 1, name: "Branch 1", address: "Addr", phone: "123" };
      req.params = { id: "1" };

      jest.spyOn(branchService, "getById").mockReturnValue(fakeBranch);

      branchController.getBranchById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: fakeBranch });
    });
  });

  describe("createBranch", () => {
    it("should return 400 if required fields are missing", () => {
      req.body = { name: "Branch" }; // missing address and phone

      branchController.createBranch(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Missing required fields" });
    });

    it("should create branch and return 201", () => {
      const newBranch = { id: 1, name: "Branch 1", address: "Addr", phone: "123" };
      req.body = { name: "Branch 1", address: "Addr", phone: "123" };

      jest.spyOn(branchService, "create").mockReturnValue(newBranch);

      branchController.createBranch(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Branch created", data: newBranch });
    });
  });

  describe("updateBranch", () => {
    it("should return 400 if id param invalid", () => {
      req.params = { id: "abc" };

      branchController.updateBranch(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Missing or invalid id parameter" });
    });

    it("should return 404 if branch not found", () => {
      req.params = { id: "1" };
      req.body = { name: "Updated Name" };

      jest.spyOn(branchService, "update").mockReturnValue(undefined);

      branchController.updateBranch(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Branch not found" });
    });

    it("should update and return 200 if branch found", () => {
      const updatedBranch = { id: 1, name: "Updated Name", address: "Addr", phone: "123" };
      req.params = { id: "1" };
      req.body = { name: "Updated Name" };

      jest.spyOn(branchService, "update").mockReturnValue(updatedBranch);

      branchController.updateBranch(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Branch updated", data: updatedBranch });
    });
  });

  describe("deleteBranch", () => {
    it("should return 400 if id param invalid", () => {
      req.params = { id: "abc" };

      branchController.deleteBranch(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Missing or invalid id parameter" });
    });

    it("should return 404 if branch not found", () => {
      req.params = { id: "1" };

      jest.spyOn(branchService, "remove").mockReturnValue(false);

      branchController.deleteBranch(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Branch not found" });
    });

    it("should delete and return 200 if branch found", () => {
      req.params = { id: "1" };

      jest.spyOn(branchService, "remove").mockReturnValue(true);

      branchController.deleteBranch(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Branch deleted" });
    });
  });
});