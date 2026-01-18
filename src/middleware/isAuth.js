import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
      ? req.headers.authorization.split(" ")
      : [];
    const token = authorization.length > 1 ? authorization[1] : null;
    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload) {
        req.user = {
          _id: payload._id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
          trimesters: payload.trimesters,
        };
        next();
      } else {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
