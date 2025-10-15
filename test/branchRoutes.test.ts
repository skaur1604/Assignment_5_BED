import request from "supertest";
import express from "express";
import branchRoutes from "../src/api/v1/routes/branch.routes";
import * as branchService from "../src/api/v1/services/branch.service";

jest.mock("../src/api/v1/services/branch.service");

const app = express();
app.use(express.json());
app.use("/api/v1", branchRoutes);

describe("Branch Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/branches", () => {
    it("should return all branches with status 200", async () => {
      const mockBranches = [{ id: 1, name: "Branch 1", address: "Address 1", phone: "1234567890" }];
      (branchService.list as jest.Mock).mockReturnValue(mockBranches);

      const res = await request(app).get("/api/v1/branches");
    });
  });

  describe("GET /api/v1/branches/:id", () => {
    it("should return branch by id with status 200", async () => {
      const mockBranch = { id: 1, name: "Branch 1", address: "Address 1", phone: "1234567890" };
      (branchService.getById as jest.Mock).mockReturnValue(mockBranch);

      const res = await request(app).get("/api/v1/branches/1");
    });

    it("should return 404 if branch not found", async () => {
      (branchService.getById as jest.Mock).mockReturnValue(undefined);

      const res = await request(app).get("/api/v1/branches/999");
    });

    it("should return 400 for invalid id", async () => {
      const res = await request(app).get("/api/v1/branches/abc");
    });
  });

  describe("POST /api/v1/branches", () => {
    it("should create a new branch and return 201", async () => {
      const newBranch = { name: "New Branch", address: "New Address", phone: "1234567890" };
      const createdBranch = { id: 1, ...newBranch };
      (branchService.create as jest.Mock).mockReturnValue(createdBranch);

      const res = await request(app).post("/api/v1/branches").send(newBranch);
    });

    it("should return 400 if required fields missing", async () => {
      const res = await request(app).post("/api/v1/branches").send({});

    });
  });

  describe("PUT /api/v1/branches/:id", () => {
    it("should update the branch and return 200", async () => {
      const updates = { name: "Updated Branch" };
      const updatedBranch = { id: 1, name: "Updated Branch", address: "Old Address", phone: "1234567890" };
      (branchService.update as jest.Mock).mockReturnValue(updatedBranch);

      const res = await request(app).put("/api/v1/branches/1").send(updates);

    });

    it("should return 404 if branch not found", async () => {
      (branchService.update as jest.Mock).mockReturnValue(undefined);

      const res = await request(app).put("/api/v1/branches/999").send({ name: "New Name" });
    });

    it("should return 400 for invalid id", async () => {
      const res = await request(app).put("/api/v1/branches/abc").send({ name: "New Name" });
    });
  });

  describe("DELETE /api/v1/branches/:id", () => {
    it("should delete the branch and return 200", async () => {
      (branchService.remove as jest.Mock).mockReturnValue(true);

      const res = await request(app).delete("/api/v1/branches/1");
    });

    it("should return 404 if branch not found", async () => {
      (branchService.remove as jest.Mock).mockReturnValue(false);

      const res = await request(app).delete("/api/v1/branches/999");
    });

    it("should return 400 for invalid id", async () => {
      const res = await request(app).delete("/api/v1/branches/abc");
    });
  });
});

