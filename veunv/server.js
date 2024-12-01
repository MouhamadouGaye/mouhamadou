// server.js
const express = require("express");
const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

// Create PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

app.use(express.json());

// Endpoint to get drivers near the user's location
app.post("/search", async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    // Query to find drivers near the user
    const result = await client.query(
      `SELECT id, name, latitude, longitude FROM users WHERE role = 'driver' AND ST_DWithin(
        ST_SetSRID(ST_Point($1, $2), 4326), 
        ST_SetSRID(ST_Point(longitude, latitude), 4326), 
        10000);`, // 10 km radius
      [longitude, latitude]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching drivers");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
