import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // replace with your frontend URL
  credentials: true
}));

//middleware to read JSON BODY
app.use(express.json());
app.use("/api/auth", authRoutes)

//Test route
app.get("/", (req, res) => {
    res.send("Backend running successfully");
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
