import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default ensureAuthenticated;
