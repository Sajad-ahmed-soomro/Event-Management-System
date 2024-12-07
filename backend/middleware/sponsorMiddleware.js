const jwt = require("jsonwebtoken");
const Sponsor = require("../models/Sponsor");

exports.Sponsorprotect = async (req, res, next) => {
  let token;

  // Check if token exists in the authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      // Decode the token and verify it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the sponsor by ID
      req.user = await Sponsor.findById(decoded.id);

      // If sponsor is not found, return an error
      if (!req.user)
        return res.status(401).json({ message: "Unauthorized access" });

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized access" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};
