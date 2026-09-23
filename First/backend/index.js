// Import the Express framework used to create the HTTP server.
const express = require("express");

// Import Mongoose used to connect the application to MongoDB.
const mongoose = require("mongoose");

// Import and immediately configure dotenv to load variables from .env.
require("dotenv").config();

// Create an Express application.
const server = express();

// Read PORT, convert it to a number, and use 5000 when it is not configured.
const PORT = Number(process.env.PORT || 5000);

// Read the MongoDB connection string from the loaded environment variables.
const MONGO_URL = process.env.MONGO_URL;

// Check whether the required MongoDB connection string was provided.
if (!MONGO_URL) {
  // Report the missing environment variable to the terminal.
  console.error("MONGO_URL is not configured");
  // Stop the process because the server cannot function without MongoDB.
  process.exit(1);
}

// Parse JSON request bodies.
server.use(express.json());

// Import the routes that manage student resources.
const userRoutes = require("./Routes/usersRoutes");

// Import the routes that manage authentication resources.
const authRoutes = require("./Routes/authRoutes");

// Register the student routes with the Express application.
server.use(userRoutes);

// Register the authentication routes with the Express application.
server.use(authRoutes);

// Start a Mongoose connection using the configured MongoDB URL.
mongoose
  // Pass the MongoDB URL to Mongoose.
  .connect(MONGO_URL)
  // Run this callback after MongoDB connects successfully.
  .then(() => {
    // Confirm that the database connection succeeded.
    console.log("MongoDB connected successfully");
    // Start accepting HTTP requests on the configured port.
    server.listen(PORT, () => {
      // Confirm that the HTTP server is listening.
      console.log("Server started on port " + PORT);
    });
  })
  // Run this callback when the MongoDB connection fails.
  .catch((err) => {
    // Display the database error message for troubleshooting.
    console.error("MongoDB connection failed", err.message);
    // Mark the process as failed before it exits.
    process.exitCode = 1;
  });
