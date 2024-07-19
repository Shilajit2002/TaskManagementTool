// Import JWT
const jwt = require("jsonwebtoken");

// Auth Function
const auth = (req, res, next) => {
  // Get the Token from Header
  const token = req.headers.authorization;

  // Check if the token exists and includes "Bearer"
  if (token && token.startsWith("Bearer ")) {
    // Extract token without "Bearer "
    const authToken = token.split(" ")[1];

    // Verify the token
    jwt.verify(authToken, process.env.SECRET_KEY, (err, user) => {
      // If Error Occurred during token verification
      if (err) {
        // Set Forbidden Error
        return res.status(403).json({ msg: "Token is not valid.", err });
      }

      // If User Exists in the token
      if (user) {
        // Set the user in request object
        req.user = user;
        // Continue to the next middleware
        next();
      } else {
        // Token is not associated with any user
        return res.status(401).json({ msg: "Invalid token: User not found." });
      }
    });
  } else {
    // No token provided or incorrect format
    return res
      .status(401)
      .json({ msg: "Unauthorized: Missing or invalid token." });
  }
};

// Export the Auth function
module.exports = auth;
