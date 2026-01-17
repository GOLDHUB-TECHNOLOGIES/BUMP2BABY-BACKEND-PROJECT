import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  verifyUser,
} from "../controllers/authController.js";

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

//Email verification route
router.post("/verify-email", verifyEmail);

// User verification
router.post("/verify-user", verifyUser);

export default router;
