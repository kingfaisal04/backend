// Import the Mongoose model used to store users.
const UserModel = require("../model/user");

// Import request validation helpers.
const { validationResult } = require("express-validator");

// Define the asynchronous controller that registers a new user account.
const register = async (req, res) => {
  // Begin handling validation and database operations.
  try {
    // Read validation results created by the route middleware.
    const errors = validationResult(req);

    // Check whether any request fields failed validation.
    if (!errors.isEmpty()) {
      // Return the first validation message and the complete error list.
      return (
        res
          // Set the response status to indicate invalid client input.
          .status(400)
          // Send validation details as a JSON response.
          .json({ message: errors.array()[0].msg, errors: errors.array() })
      );
    }

    // Extract only the fields required by the user schema.
    const { name, email, password } = req.body;

    // Search for an existing account with the same email address.
    const existingUser = await UserModel.findOne({ email });

    // Check whether the email address is already registered.
    if (existingUser) {
      // Return a conflict response instead of creating a duplicate account.
      return res.status(409).json({ message: "User already exists" });
    }

    // Create the user; the model hook hashes the password before saving.
    const user = await UserModel.create({ name, email, password });

    // Return the new user's public fields without exposing the password hash.
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
    // Handle validation, database, and unexpected controller errors.
  } catch (error) {
    // Begin constructing the client-error response.
    res
      // Set the response status to indicate the request could not be processed.
      .status(400)
      // Return a readable message and the underlying error detail.
      .json({ message: "Error creating user", error: error.message });
  }
};

// Export the registration controller for use by the authentication routes.
module.exports = { register };
