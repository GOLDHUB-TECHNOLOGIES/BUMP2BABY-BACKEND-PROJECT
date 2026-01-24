import express from "express";
import { getTips, createTip } from "../controllers/tipController.js";
import { isAuth } from "../middleware/isAuth.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Get tips (all authenticated users)
router.get("/", isAuth, getTips);

// Create tip (admin/moderator only)
router.post("/", isAuth, authorize("admin", "moderator"), createTip);

export default router;
