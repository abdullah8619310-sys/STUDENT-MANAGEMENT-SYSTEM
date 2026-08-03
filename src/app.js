import express from "express";
import cors from "cors";
import studentRoutes from "./routes/student.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running"
  });
});

// Student routes
app.use("/api/students", studentRoutes);

export default app;