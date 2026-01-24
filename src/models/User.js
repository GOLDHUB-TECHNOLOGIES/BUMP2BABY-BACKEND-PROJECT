import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // don't make it unique
    role: {
      type: String,
      required: true,
      enum: ["pregnant", "new_parent", "caregiver", "admin", "moderator"],
    },
    trimesters: {
      type: String,
      enum: ["1-13weeks", "14-27weeks", "28-40weeks"],
    },
    verificationCode: String,
    forgotPasswordCode: String,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function () {
  // 'this' is the user document
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
