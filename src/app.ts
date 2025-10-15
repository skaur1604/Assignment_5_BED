import express, { Express } from "express";
import morgan from "morgan";


// Import routes
import employeeRoutes from "./api/v1/routes/employee.routes";
import branchRoutes from "./api/v1/routes/branch.routes";

const app: Express = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

// Route handlers
app.use("/api/v1", employeeRoutes);
app.use("/api/v1", branchRoutes);

export default app;








