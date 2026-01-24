import express from "express";
import { getSymptoms, checkSymptom } from "../controllers/symptomController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

// Get list of symptoms
router.get("/", isAuth, getSymptoms);

// Check specific symptom
router.post("/check", isAuth, checkSymptom);

export default router;
