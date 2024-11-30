// routes/auth.js
const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();
const router = express.Router();

// Secret key for JWT (should be in .env in production)

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // Custom file naming
  },
});
const upload = multer({ storage });

// router.get("/user", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
//       decoded.user_id,
//     ]);
//     const user = result.rows[0];

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//       user_id: user.user_id,
//       name: user.name,
//       email: user.email,
//       profilePicture: user.profile_photo, // Assuming you store this
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.get("/user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const result = await pool.query(
      "SELECT user_id, username, email, name, pseudo, profile_photo FROM users WHERE user_id = $1",
      [decoded.user_id]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      name: user.name,
      pseudo: user.pseudo,
      profile_photo: user.profile_photo, // Include profile_photo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Signup route
router.post("/signup", upload.single("profile_photo"), async (req, res) => {
  const { username, email, password, name, pseudo } = req.body;
  const profilePhotoPath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password_hash, name, pseudo, profile_photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [username, email, hashedPassword, name, pseudo, profilePhotoPath]
    );
    res
      .status(201)
      .json({ message: "User signed up successfully!", user: newUser.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error signing up user" });
  }
});

// Sign-in
// router.post("/signin", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);
//     const user = result.rows[0];

//     if (!user) {
//       return res.status(400).json({ message: "You haven't subscribe yet" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password_hash);

//     if (!isMatch) {
//       return res.status(400).json({ message: "The password is not corrected" });
//     }

//     const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Send the token in a cookie (optional)
//     res.cookie("token", token, { httpOnly: true });

//     res.json({ message: "User signed in successfully", token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Sign-in updated
// router.post("/signin", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Query to find user by email
//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);
//     const user = result.rows[0];

//     // If the user does not exist, send an error response
//     if (!user) {
//       return res.status(400).json({ message: "You haven't subscribed yet" });
//     }

//     // Compare the provided password with the stored hashed password
//     const isMatch = await bcrypt.compare(password, user.password_hash); // Use password_hash from the database

//     // If the passwords do not match, return an error
//     if (!isMatch) {
//       return res.json({ status: 401, message: "The password is uncorrected" });
//     }

//     // Create a JWT token with the user ID as the payload
//     const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Optionally send the token in a cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//     });

//     // Return a successful response along with the token
//     res.json({ message: "User signed in successfully", token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "You haven't subscribed yet" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "The password is incorrect" });
    }

    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Return user metadata with the token
    res.json({
      message: "User signed in successfully",
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        profile_photo: user.profile_photo,
        // Include any additional fields as needed
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Sign-out
router.post("/signout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User signed out successfully" });
});

module.exports = router;

// CE CODE EST BON POUR UNIQUEMENT ENVOYER DES TEXTES
// MAIS PAS LA PHOTO

// Sign-up
// router.post("/signup", async (req, res) => {
//   const { username, email, password, name, pseudo, profile_photo } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const result = await pool.query(
//       `INSERT INTO users (username, email, password_hash, name, pseudo, profile_photo)
//        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
//       [username, email, hashedPassword, name, pseudo, profile_photo]
//     );

//     res
//       .status(201)
//       .json({ message: "User registered successfully", user: result.rows[0] });
//   } catch (error) {
//     if (error.code === "23505") {
//       res.status(400).json({ message: "Username or email already exists" });
//     } else {
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// });
