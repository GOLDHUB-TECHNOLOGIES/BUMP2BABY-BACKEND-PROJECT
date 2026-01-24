import express from "express";
import { getChatToken } from "../controllers/chatController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

// Get Firebase Custom Token
router.post("/token", isAuth, getChatToken);

export default router;
