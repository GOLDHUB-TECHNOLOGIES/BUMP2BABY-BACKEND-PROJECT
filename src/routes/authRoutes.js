import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  verifyUser,
  forgotPasswordCode,
  recoverPassword,
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

//Forgot password route
router.post("/forgot-password", forgotPasswordCode);

//Recover password route
router.post("/recover-password", recoverPassword);

export default router;
