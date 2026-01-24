import mongoose from "mongoose";

const symptomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true }, // e.g., 'nausea', 'headache'
    description: { type: String },
    // Default advice for home care (low severity)
    homeCareAdvice: [{ type: String }],
    // Advice for when to see a doctor (high severity)
    medicalAdvice: [{ type: String }],
  },
  { timestamps: true },
);

const Symptom = mongoose.model("Symptom", symptomSchema);
export default Symptom;
