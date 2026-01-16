import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // don't make it unique
    role: {
      type: Number,
      required: true,
      enum: ["pregnant", "new_parent", "caregiver"],
    },
    babyAgeMonths: {
      type: Number, // e.g. 0 for newborn, 1,2,3...
      min: 0,
      max: 60,
    },
  },
  { timestamps: true }
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
