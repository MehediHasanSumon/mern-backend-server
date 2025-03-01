import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import DatabaseConnect from "./config/Database.js";
import route from "./routes/Api.js";
import morgan from "morgan";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Cors Options
const corsOptions = {
  origin: process.env.FRONTEND_HOST,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Database configuration
DatabaseConnect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// // Configuration API Routes
app.use("/api/", route);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
