import admin from "../config/firebase.js";

// @desc    Get Firebase Custom Token for Chat
// @route   POST /api/chat/token
// @access  Private
export const getChatToken = async (req, res) => {
  try {
    const { _id, email, role } = req.user;

    // Use the user's MongoDB _id as the Firebase UID
    const uid = _id.toString();

    // Create additional claims if needed (e.g., role)
    const additionalClaims = {
      email,
      role,
    };

    const customToken = await admin
      .auth()
      .createCustomToken(uid, additionalClaims);

    res.status(200).json({
      status: "success",
      token: customToken,
    });
  } catch (error) {
    console.error("Error creating custom token:", error);
    res.status(500).json({
      message:
        "Failed to generate chat token. Ensure Firebase Admin is configured correctly.",
    });
  }
};
