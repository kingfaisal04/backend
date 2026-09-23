// Import the controller that handles user registration.
const { register } = require("../Controllers/authController");

// Import request validation rules.
const { body } = require("express-validator");

// Import Express.
const express = require("express");

// Create the authentication router.
const router = express.Router();

// Define the endpoint that validates and registers a new user.
router.post(
  // Match POST requests sent to the registration path.
  "/register",
  // Apply the following validation rules before the controller runs.
  [
    // Require a non-empty user name after trimming whitespace.
    body("name").trim().notEmpty().withMessage("Name is required"),
    // Begin validating the user's email address.
    body("email")
      // Require the email value to use a valid email format.
      .isEmail()
      // Provide a readable error when the email format is invalid.
      .withMessage("A valid email is required")
      // Normalize the email before it reaches the controller.
      .normalizeEmail(),
    // Begin validating the user's password.
    body("password")
      // Require a password containing at least six characters.
      .isLength({ min: 6 })
      // Provide a readable error when the password is too short.
      .withMessage("Password must be at least 6 characters"),
  ],
  // Run the registration controller after validation succeeds.
  register,
);

// Export the configured authentication router.
module.exports = router;
