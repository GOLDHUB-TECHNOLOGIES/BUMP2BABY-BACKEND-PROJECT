import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

import tipRoutes from "./routes/tipRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

import communityRoutes from "./routes/communityRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";

const app = express();

// --- FIXED CORS SECTION ---
// We use the empty () to allow ALL connections (Localhost, Netlify, Postman)
app.use(cors());
// --------------------------

//middleware to read JSON BODY
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/symptoms", symptomRoutes);

//Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
