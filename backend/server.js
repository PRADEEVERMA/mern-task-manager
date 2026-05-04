import "dotenv/config";
import express from "express";
import connectDB from "./db/connectDatabase.js"; // ✅ सही path
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// ✅ Railway + local दोनों के लिए safe
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS (final working)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-task-manager-kfsnpuvp0-pradeevermas-projects.vercel.app",
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
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