import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import leadRoutes from "./routers/leadRoutes.js";
import demoRoutes from "./routers/demoRoutes.js"
import scheduleRoutes from "./routers/scheduleRoutes.js";
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/leads", leadRoutes);
app.use("/api/demo", demoRoutes);
app.use("/api/schedule", scheduleRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Popup Form Backend Running");
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
