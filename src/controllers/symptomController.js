import Symptom from "../models/Symptom.js";

// Predefined symptoms data
const INITIAL_SYMPTOMS = [
  {
    name: "Nausea",
    slug: "nausea",
    homeCareAdvice: [
      "Eat small, frequent meals.",
      "Avoid spicy or greasy foods.",
      "Stay hydrated with clear fluids along with ginger tea.",
    ],
    medicalAdvice: [
      "Severe vomiting preventing keeping fluids down.",
      "Signs of dehydration.",
    ],
  },
  {
    name: "Headache",
    slug: "headache",
    homeCareAdvice: [
      "Rest in a dark, quiet room.",
      "Apply a cool compress to your forehead.",
      "Hydrate well.",
    ],
    medicalAdvice: [
      "Sudden, severe headache.",
      "Headache accompanied by blurred vision.",
    ],
  },
  {
    name: "Dizziness",
    slug: "dizziness",
    homeCareAdvice: [
      "Lie down on your side.",
      "Drink water.",
      "Move slowly when standing up.",
    ],
    medicalAdvice: ["Fainting.", "Dizziness combined with palpitations."],
  },
  {
    name: "Fever",
    slug: "fever",
    homeCareAdvice: ["Rest and drink plenty of fluids.", "Keep cool."],
    medicalAdvice: [
      "Temperature over 100.4°F (38°C).",
      "Fever with rash or pain.",
    ],
  },
  {
    name: "Abdominal Pain",
    slug: "abdominal-pain",
    homeCareAdvice: ["Rest and change positions.", "Warm bath (not hot)."],
    medicalAdvice: ["Severe or persistent pain.", "Pain with bleeding."],
  },
  {
    name: "Contractions",
    slug: "contractions",
    homeCareAdvice: ["Rest and hydrate.", "Change activity/position."],
    medicalAdvice: [
      "Regular, painful contractions before 37 weeks.",
      "Water breaks.",
    ],
  },
  {
    name: "Reduced Movement",
    slug: "reduced-movement",
    homeCareAdvice: ["Lie on your left side for 2 hours and count kicks."],
    medicalAdvice: [
      "Less than 10 movements in 2 hours.",
      "No movement perceived.",
    ],
  },
  {
    name: "Blurred Vision",
    slug: "blurred-vision",
    homeCareAdvice: ["Rest your eyes."],
    medicalAdvice: [
      "Sudden blurriness.",
      "Flashing lights or spots (could be Preeclampsia).",
    ],
  },
  {
    name: "Severe Fatigue",
    slug: "severe-fatigue",
    homeCareAdvice: ["Prioritize sleep.", "Eat iron-rich foods."],
    medicalAdvice: ["Breathlessness.", "Fainting."],
  },
  {
    name: "Shortness of Breath",
    slug: "shortness-of-breath",
    homeCareAdvice: ["Sit upright.", "Move slowly."],
    medicalAdvice: [
      "Sudden severe shortness of breath.",
      "Blue lips or chest pain.",
    ],
  },
  {
    name: "Bleeding",
    slug: "bleeding",
    homeCareAdvice: [], // Bleeding usually triggers medical attention
    medicalAdvice: ["Any vaginal bleeding should be checked by a provider."],
  },
  {
    name: "Swelling",
    slug: "swelling",
    homeCareAdvice: ["Elevate your feet.", "Wear compression socks."],
    medicalAdvice: [
      "Sudden swelling in face or hands.",
      "One leg significantly more swollen than the other.",
    ],
  },
];

// @desc    Get all available symptoms
// @route   GET /api/symptoms
// @access  Public (or Private)
export const getSymptoms = async (req, res) => {
  try {
    // Check if we need to seed data (simple check for empty DB)
    const count = await Symptom.countDocuments();
    if (count === 0) {
      await Symptom.insertMany(INITIAL_SYMPTOMS);
    }

    const symptoms = await Symptom.find({}).select("name slug");
    res.status(200).json({ status: "success", data: symptoms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check symptom severity and get advice
// @route   POST /api/symptoms/check
// @access  Private
// Body: { slug: 'headache', severity: 'high' | 'medium' | 'low', severityScale: 1-10 }
export const checkSymptom = async (req, res) => {
  try {
    const { slug, severity, severityScale } = req.body;

    // Find the symptom
    const symptom = await Symptom.findOne({ slug });
    if (!symptom) {
      return res.status(404).json({ message: "Symptom not found" });
    }

    // Logic for severity
    // "Severe" if severity string is 'high' OR severityScale >= 7
    const isSevere =
      severity === "high" ||
      (severityScale && severityScale >= 7) ||
      slug === "bleeding";

    let action = "";
    let advice = [];
    let message = "";

    if (isSevere) {
      action = "SEE_DOCTOR_IMMEDIATELY";
      message =
        "Based on your severity details, you should seek medical attention immediately.";
      advice = symptom.medicalAdvice;
    } else {
      action = "HOME_CARE";
      message =
        "Here is some home care advice. If symptoms worsen, contact a doctor.";
      advice = symptom.homeCareAdvice;
    }

    // "AI" Advice placeholder (In a real app, you would call OpenAI here)
    // For now, we return our structured DB advice as the "AI" response
    // plus a generic AI preamble.
    const aiResponse = {
      analysis: message,
      specific_advice: advice,
      disclaimer:
        "This is automated advice and does not replace professional medical opinion.",
    };

    res.status(200).json({
      status: "success",
      data: {
        symptom: symptom.name,
        severityReceived: severity || severityScale,
        action,
        aiAdvice: aiResponse,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
