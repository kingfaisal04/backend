// Import Mongoose for defining the student schema and model.
const mongoose = require("mongoose");

// Store the Mongoose schema constructor in a shorter local name.
const Schema = mongoose.Schema;

// Define the fields and validation rules for student documents.
const StudentSchema = new Schema({
  // Store the student's name.
  name: {
    // Store the name as text.
    type: String,
    // End the name field definition.
  },
  // Define the student's age field.
  age: {
    // Store the age as a number.
    type: Number,
    // Require every student to provide an age.
    required: true,
    // End the age field definition.
  },
  // Define the student's gender field.
  gender: {
    // Store the gender as text.
    type: String,
    // Require every student to provide a gender.
    required: true,
    // End the gender field definition.
  },
  // Define the student's location field.
  location: {
    // Store the location as text.
    type: String,
    // Require every student to provide a location.
    required: true,
    // End the location field definition.
  },
  // Define the student's phone number field.
  phoneNumber: {
    // Store the phone number as a number.
    type: Number,
    // Require every student to provide a phone number.
    required: true,
    // End the phone number field definition.
  },
  // End the student schema field definitions.
});

// Create a Mongoose model from the student schema.
const StudentModel = mongoose.model("Student", StudentSchema);

// Export the model so controllers can query and save students.
module.exports = StudentModel;
