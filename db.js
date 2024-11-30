const { Pool } = require("pg");

// Configure the PostgreSQL connection
const pool = new Pool({
  user: "gaye", // Replace with your PostgreSQL username
  host: "localhost", // Replace with your PostgreSQL host (default is 'localhost')
  database: "smedia", // Replace with your PostgreSQL database name
  password: "Postgres.2424", // Replace with your PostgreSQL password
  port: 5433, // Replace with your PostgreSQL port (default is 5432)
});

// Export the pool instance
module.exports = pool;
