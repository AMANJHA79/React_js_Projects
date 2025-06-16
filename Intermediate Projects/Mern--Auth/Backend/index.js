import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDb } from "./db/connectDb.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
dotenv.config();
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(port, async () => {
  try {
    await connectDb();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(`Error in mongoDb ${error}`);
    process.exit(1);
  }
});
