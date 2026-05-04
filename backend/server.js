import "dotenv/config";
import express from "express";
import connectDB from "./db/connectDatabase.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// ✅ Railway PORT
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ FIXED CORS
app.use(
  cors({
    origin: "https://mern-task-manager-kfsnpuvp0-pradeevermas-projects.vercel.app",
    credentials: false, // 🔥 IMPORTANT
  })
);

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Hello, Backend is working 🚀" });
});

// Start server
connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server started on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection failed:", err);
  });