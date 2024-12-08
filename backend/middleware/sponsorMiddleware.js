const jwt = require("jsonwebtoken");

const Sponsorprotect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret
    req.sponsor = decoded; // Store sponsor info in the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { Sponsorprotect };
