import Tip from "../models/Tip.js";

// @desc    Get tips based on user's trimester
// @route   GET /api/tips
// @access  Private
export const getTips = async (req, res) => {
  try {
    const { trimesters } = req.user;

    // Fetch tips that match the user's trimester OR are for 'all'
    const tips = await Tip.find({
      $or: [{ trimester: trimesters }, { trimester: "all" }],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: tips.length,
      data: tips,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new tip
// @route   POST /api/tips
// @access  Private/Admin
export const createTip = async (req, res) => {
  try {
    const { title, content, trimester, category, tags, isAiGenerated } =
      req.body;

    const tip = await Tip.create({
      title,
      content,
      trimester,
      category,
      tags,
      isAiGenerated,
    });

    res.status(201).json({
      status: "success",
      data: tip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
