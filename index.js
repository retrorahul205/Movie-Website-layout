const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Enable CORS (important for frontend fetch)
app.use(cors());

// Import the movies data
const movies = require("./movies.json");

// Define API route
app.get("/api/movies", (req, res) => {
  console.log("API Request received! Sending movies data...");
  res.json(movies);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
