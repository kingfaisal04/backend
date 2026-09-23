// Import Mongoose for defining schemas and models.
const mongoose = require("mongoose");

// Import bcrypt for securely hashing user passwords.
const bcrypt = require("bcrypt");

// Store the Mongoose schema constructor in a shorter local name.
const Schema = mongoose.Schema;

// Define the fields and validation rules for user documents.
const UserSchema = new Schema({
  // Define the user's display name field.
  name: {
    // Store the name as text.
    type: String,
    // Require every user to provide a name.
    required: true,
    // Prevent multiple users from using the same name.
    unique: true,
    // End the name field definition.
  },
  // Define the user's email field.
  email: {
    // Store the email as text.
    type: String,
    // Require every user to provide an email.
    required: true,
    // Prevent multiple users from using the same email.
    unique: true,
    // End the email field definition.
  },
  // Define the user's password field.
  password: {
    // Store the password as text or, after saving, a password hash.
    type: String,
    // Require every user to provide a password.
    required: true,
    // End the password field definition.
  },
  // End the user schema field definitions.
});

// Register a hook that runs before a user document is saved.
UserSchema.pre("save", async function (next) {
  // Check whether the password field was changed in this operation.
  if (!this.isModified("password")) return next();
  // Replace the plain-text password with a bcrypt hash using ten rounds.
  this.password = await bcrypt.hash(this.password, 10);
  // Tell Mongoose that the pre-save hook has finished.
  next();
});

// Create a Mongoose model from the user schema.
const UserModel = mongoose.model("User", UserSchema);

// Export the model so controllers can query and save users.
module.exports = UserModel;
