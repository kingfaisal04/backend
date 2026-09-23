// Import the Express framework.
const express = require("express");

// Import the controller that handles student requests.
const {
  // Handle requests for all students.
  retrieveUser,
  // Handle requests that create a student.
  createUser,
  // Handle requests for one student.
  getUserById,
  // Handle requests that update a student.
  updateUser,
  // Handle requests that delete a student.
  deleteUser,
  // Load the controller functions from the student controller module.
} = require("../Controllers/usersController");

// Create a dedicated router for student endpoints.
const router = express.Router();

// Define the endpoint that retrieves every student.
router.get("/students", retrieveUser);

// Define the endpoint that creates a new student.
router.post("/students", createUser);

// Define the endpoint that retrieves one student by ID.
router.get("/students/:id", getUserById);

// Define the endpoint that updates one student by ID.
router.patch("/students/:id", updateUser);

// Define the endpoint that deletes one student by ID.
router.delete("/students/:id", deleteUser);

// Export the configured student router.
module.exports = router;
