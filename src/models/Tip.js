import mongoose from "mongoose";

const tipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    trimester: {
      type: String,
      enum: ["1-13weeks", "14-27weeks", "28-40weeks", "all"],
      default: "all",
    },
    category: {
      type: String,
      enum: [
        "nutrition",
        "exercise",
        "mental_health",
        "development",
        "general",
      ],
      default: "general",
    },
    isAiGenerated: { type: Boolean, default: false },
    tags: [String],
  },
  { timestamps: true },
);

const Tip = mongoose.model("Tip", tipSchema);
export default Tip;
