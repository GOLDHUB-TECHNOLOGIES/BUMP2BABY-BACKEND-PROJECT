import {
  registerValidation,
  loginValidation,
  sendMailValidation,
  verifyUserValidation,
  forgotPasswordValidation,
  changePasswordValidation,
  updateProfileValidation,
} from "../validation/authValidation.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateCode from "../utils/generatecode.js";
import sendMail from "../utils/sendMail.js";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    // Validate incoming data
    const { error } = registerValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, role, trimesters } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role,
      trimesters,
    });

    // Generate token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        trimesters: user.trimesters,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        trimesters: user.trimesters,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    // --- THE FIX IS HERE ---
    // We added .select('+password') to ensure we actually get the hash from the DB
    const user = await User.findOne({ email }).select("+password");
    // -----------------------

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        trimesters: user.trimesters,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        trimesters: user.trimesters,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EMAIL VERIFICATION
export const verifyEmail = async (req, res) => {
  try {
    const { error } = sendMailValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }
    const code = generateCode(6);
    user.verificationCode = code;
    await user.save();

    // Here you would send the code via email using your email service
    await sendMail({
      emailTo: user.email,
      subject: "Email Verification Code",
      code,
      content: "verify your email",
    });
    res
      .status(200)
      .json({ status: "success", message: "Verification code sent to email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify User
export const verifyUser = async (req, res) => {
  try {
    const { error } = verifyUserValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    res
      .status(200)
      .json({ status: "success", message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Forgot password code
export const forgotPasswordCode = async (req, res) => {
  try {
    const { error } = sendMailValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const code = generateCode(6);
    user.forgotPasswordCode = code;
    await user.save();

    await sendMail({
      emailTo: user.email,
      subject: "Forgotten password reset code",
      code,
      content: "change your password",
    });
    res.status(200).json({
      status: "success",
      message: "Forgot password code sent successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// recover password
export const recoverPassword = async (req, res) => {
  try {
    // Validate incoming data
    const { error } = forgotPasswordValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    // Implementation for password recovery goes here
    const { email, code, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.forgotPasswordCode !== code) {
      return res.status(400).json({ message: "Invalid password reset code" });
    }
    user.password = password;
    user.forgotPasswordCode = null;
    await user.save();
    res
      .status(200)
      .json({ status: "success", message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { error } = changePasswordValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      res.status(400).json({ message: "Old password is incorrect" });
    }
    if (oldPassword === newPassword) {
      res
        .status(400)
        .json({ message: "New password must be different from old password" });
    }
    user.password = newPassword;
    await user.save();
    res
      .status(200)
      .json({ status: "success", message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { error } = updateProfileValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { _id } = req.user;
    const { name, email } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    if (email) {
      const isEmailTaken = await User.findOne({ email });
      if (
        isEmailTaken &&
        isEmailTaken.email === email &&
        String(user._id) !== String(isEmailTaken._id)
      ) {
        res.status(400).json({ message: "Email is already taken" });
      }
    }
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;

    if (email) {
      user.isVerified = false;
    }
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        trimesters: user.trimesters,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
