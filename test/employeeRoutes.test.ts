import request from "supertest";
import express from "express";
import employeeRoutes from "../src/api/v1/routes/employee.routes";

const app = express();
app.use(express.json());
app.use("/api/v1", employeeRoutes);

  it("GET /api/v1/employees/:id should return 404 if employee not found", async () => {
    const res = await request(app).get("/api/v1/employees/999");
    expect(res.status).toBe(404);
  });

  it("PUT /api/v1/employees/:id should update employee and return 200", async () => {
    const patch = { position: "Senior Developer" };
    const res = await request(app).put("/api/v1/employees/1").send(patch);
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ id: 1, ...patch });
  });

  it("PUT /api/v1/employees/:id should return 404 if employee not found", async () => {
    const patch = { position: "Senior Developer" };
    const res = await request(app).put("/api/v1/employees/999").send(patch);
    expect(res.status).toBe(404);
  });

  it("DELETE /api/v1/employees/:id should delete employee and return 200", async () => {
    const res = await request(app).delete("/api/v1/employees/1");
    expect(res.status).toBe(200);
  });

  it("DELETE /api/v1/employees/:id should return 404 if employee not found", async () => {
    const res = await request(app).delete("/api/v1/employees/999");
    expect(res.status).toBe(404);
  });