import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  verifyUser,
  forgotPasswordCode,
  recoverPassword,
  changePassword,
  updateProfile,
} from "../controllers/authController.js";
import { isAuth } from "../middleware/isAuth.js";

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

//Change Password route
router.put("/change-password", isAuth, changePassword);

// Update profile route
router.put("/update-profile", isAuth, updateProfile);

export default router;
