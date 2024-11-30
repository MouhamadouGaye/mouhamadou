// middleware/authMiddleware.js

// const authenticateToken = (req, res, next) => {
//   // const token = req.cookies.token || req.headers["authorization"];
//   const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from the header
//   console.log("Token:", token); // Add this line to check the token

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized, Token is missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res
//       .status(403)
//       .json({ message: "Forbidden (Invalid or expired token)" });
//   }
// };

// module.exports = authenticateToken;

// function authenticateToken(req, res, next) {
//   const token = req.header("Authorization")?.split(" ")[1]; // Extract the token from Authorization header

//   if (!token) {
//     return res.status(403).json({ error: "Forbidden (No token provided)" });
//   }

//   jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
//     expiresIn: "1h"; // Token expires in 1 hour

//     if (err) {
//       return res
//         .status(403)
//         .json({ error: "Forbidden (Invalid or expired token)" });
//     }
//     req.user = user; // Add user information to the request object
//     next(); // Proceed to the next middleware or route handler
//   });
// }
// module.exports = authenticateToken;

const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Forbidden (Invalid or expired token)" });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
