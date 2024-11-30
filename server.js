const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { Pool } = require("pg");
const path = require("path");
const fs = require("fs"); // Added for file system management
const authRoutes = require("./routes/auth");
const authenticateToken = require("./middleware/authMiddleware");

const app = express();
const PORT = 3006;

app.use(express.json()); // To parse JSON requests

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Auth routes
app.use("/api/auth", authRoutes);

// Example of a protected route
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: `Hello, user with ID ${req.user.user_id}` });
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

//PostgreSQL setup
const pool = new Pool({
  user: "gaye",
  host: "localhost",
  database: "smedia",
  password: "Postgres.2424",
  port: 5433,
});

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
// const upload = multer({ storage }); /// THIS WAS AMELIORATED BY THE CODE UNDERNEATH
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/quicktime",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only images and videos are allowed"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

// // Define file filter
// const fileFilter = (req, file, cb) => {
//   const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];

//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true); // Accept file
//   } else {
//     cb(new Error('Only images and videos are allowed'), false); // Reject file
//   }
// };

// // Multer configuration
// const upload = multer({
//   storage: multer.diskStorage({}),
//   fileFilter,
// });
// Serve static files from the uploads folder
app.use("/uploads", express.static(uploadsDir));

// app.get("/posts", async (req, res) => {
//   try {
//     const posts = await pool.query(
//       `SELECT posts.*, users.name, users.pseudo, users.profile_photo
//        FROM posts
//        JOIN users ON posts.user_id = users.user_id
//        ORDER BY posts.created_at DESC`
//     );

//     res.json(posts.rows);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/posts", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  // offset = (page - 1) * limit;
  // offset = (3 - 1) * 10;  // It skips the 1 index and goes to the second index
  // offset = 2 * 10;
  // offset = 20;
  // This means skip the first 20 items and start fetching items from the 21st item.
  try {
    const offset = (page - 1) * limit;   

    const posts = await pool.query(
      `SELECT posts.*, users.name, users.pseudo, users.profile_photo
       FROM posts
       JOIN users ON posts.user_id = users.user_id
       ORDER BY posts.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );


    res.json(posts.rows);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post(
  "/posts",
  authenticateToken,
  upload.array("media"),
  async (req, res) => {
    const { content } = req.body;
    const mediaFiles = req.files.map((file) => `/uploads/${file.filename}`);
    const userId = req.user?.user_id; // Get user ID from the token

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const newPost = await pool.query(
        `INSERT INTO posts (content, media, created_at, user_id) VALUES ($1, $2, NOW(), $3) RETURNING *`,
        [content, JSON.stringify(mediaFiles), userId]
      );
      res.status(201).json(newPost.rows[0]);
    } catch (error) {
      console.error("Error creating post:", error.message); // Log the error details
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// app.get("/posts/:postId", async (req, res) => {
//   const { postId } = req.params;

//   try {
//     const post = await pool.query(
//       `SELECT posts.*, users.name, users.pseudo, users.profile_photo
//        FROM posts
//        JOIN users ON posts.user_id = users.user_id
//        WHERE posts.post_id = $1`,
//       [postId]
//     );

//     if (post.rows.length === 0) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     res.json(post.rows[0]);
//   } catch (error) {
//     console.error("Error fetching post:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    // Fetch the post and its user details
    const postResult = await pool.query(
      `SELECT posts.*, users.name, users.pseudo, users.profile_photo
       FROM posts
       JOIN users ON posts.user_id = users.user_id
       WHERE posts.post_id = $1`,
      [postId]
    );

    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    const post = postResult.rows[0];

    // Fetch comments for the post
    const commentsResult = await pool.query(
      `SELECT comments.content, comments.created_at, users.name AS author
       FROM comments
       JOIN users ON comments.user_id = users.user_id
       WHERE comments.post_id = $1
       ORDER BY comments.created_at DESC`,
      [postId]
    );

    // Add comments to the post object
    post.comments = commentsResult.rows;

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// {
//   "post_id": 123,
//   "content": "This is my post content",
//   "user_id": 1,
//   "name": "John Doe",
//   "pseudo": "johnd",
//   "profile_photo": "john.jpg",
//   "comments": [
//     {
//       "content": "Great post!",
//       "created_at": "2024-11-23T14:00:00Z",
//       "author": "Alice Smith"
//     },
//     {
//       "content": "I totally agree!",
//       "created_at": "2024-11-23T15:30:00Z",
//       "author": "Bob Johnson"
//     }
//   ]
// }

app.delete("/posts/:postId", authenticateToken, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.user_id;

  console.log(postId);

  try {
    const result = await pool.query(
      "DELETE FROM posts WHERE post_id = $1 AND user_id = $2 RETURNING *",
      [postId, userId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Post not found or not authorized" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// New API endpoint for React component (if using user_id and other fields)
app.post("/api/posts", upload.single("media"), async (req, res) => {
  const { user_id, content } = req.body;
  const media = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newPost = await pool.query(
      "INSERT INTO posts (user_id, content, media, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [user_id, content, media]
    );
    res.status(201).json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.put("/posts/:post_id/:action", async (req, res) => {
//   const { post_id, action } = req.params;

//   // Map action to column
//   const validColumns = {
//     like: "likes",
//     dislike: "dislikes",
//     share: "shares",
//     thumbUp: "thumb_ups",
//   };

//   const column = validColumns[action];
//   if (!column) {
//     return res.status(400).json({ error: "Invalid action" });
//   }

//   if (!post_id) {
//     return res.status(400).json({ error: "Post ID is required" });
//   }

//   try {
//     const result = await pool.query(
//       `UPDATE posts SET ${column} = ${column} + 1 WHERE post_id = $1 RETURNING *`,
//       [post_id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     res.status(200).json(result.rows[0]);
//   } catch (err) {
//     console.error(
//       `Error updating ${column} for post_id=${post_id}:`,
//       err.message
//     );
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.put("/posts/:post_id/:action", async (req, res) => {
  const { post_id, action } = req.params;
  const { user_id } = req.body; // Assuming user_id is passed in the request body

  // Map action to column
  const validColumns = {
    like: "likes",
    dislike: "dislikes",
    share: "shares",
    thumbUp: "thumb_ups",
  };

  const column = validColumns[action];
  if (!column) {
    return res.status(400).json({ error: "Invalid action" });
  }

  if (!post_id || !user_id) {
    return res.status(400).json({ error: "Post ID and User ID are required" });
  }

  try {
    // Check if the user has already performed this action
    const interactionExists = await pool.query(
      `SELECT * FROM post_interactions WHERE user_id = $1 AND post_id = $2 AND action = $3`,
      [user_id, post_id, action]
    );

    if (interactionExists.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "You have already performed this action" });
    }

    // Record the interaction
    await pool.query(
      `INSERT INTO post_interactions (user_id, post_id, action) VALUES ($1, $2, $3)`,
      [user_id, post_id, action]
    );

    // Update the corresponding column in the posts table

    const result = await pool.query(
      `UPDATE posts SET ${column} = ${column} + 1 WHERE post_id = $1 RETURNING *`,
      [post_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(
      `Error updating ${column} for post_id=${post_id}:`,
      err.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/posts/:post_id/comments", async (req, res) => {
  const { post_id } = req.params;

  try {
    const result = await pool.query(
      // "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC",
      "SELECT comments.comment_id, comments.content, comments.created_at, users.user_id, users.name AS author, users.profile_photo FROM comments JOIN users ON comments.user_id = users.user_id WHERE comments.post_id = $1 ORDER BY comments.created_at ASC",
      [post_id]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

app.post("/posts/:post_id/comments", async (req, res) => {
  const { post_id } = req.params;
  const { content, user_id } = req.body;

  if (!content || !user_id) {
    return res.status(400).json({ error: "Content and user ID are required" });
  }

  try {
    // Assuming you have a `comments` table with columns: post_id, content, user_id
    const result = await pool.query(
      "INSERT INTO comments (post_id, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [post_id, content, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// the comments endpoint that delete the comments
app.delete("/comments/:commentId", authenticateToken, async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.user_id; // From the token

  try {
    // Check if the comment exists and retrieve the related post owner
    const comment = await pool.query(
      `SELECT comments.*, posts.user_id AS post_owner_id
       FROM comments
       JOIN posts ON comments.post_id = posts.post_id
       WHERE comments.comment_id = $1`,
      [commentId]
    );

    if (comment.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const commentOwnerId = comment.rows[0].user_id;
    const postOwnerId = comment.rows[0].post_owner_id;

    // Allow deletion only if the user is the comment owner or the post owner
    if (userId !== commentOwnerId && userId !== postOwnerId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this comment" });
    }

    // Perform deletion
    await pool.query("DELETE FROM comments WHERE comment_id = $1", [commentId]);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
