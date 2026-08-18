import express from "express";
import cors from "cors";
import studentRoutes from "./routes/student.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.use(errorHandler);

export default app;
