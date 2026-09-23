// Import the Mongoose model used to store student records.
const StudentModel = require("../model/student");

// Define the asynchronous controller that creates a student.
const createUser = async (req, res) => {
  // Begin handling the create operation.
  try {
    // Create a student document from the request body.
    const student = await StudentModel.create(req.body);
    // Return the newly created student with a created status.
    res.status(201).json(student);
    // Handle validation and database errors.
  } catch (error) {
    // Return the error message as a bad-request response.
    res.status(400).json({ message: error.message });
  }
};

// Define the asynchronous controller that retrieves all students.
const retrieveUser = async (req, res) => {
  // Begin handling the collection query.
  try {
    // Query every student document.
    const student = await StudentModel.find();
    // Return the student collection with a successful status.
    res.status(200).json(student);
    // Handle database query errors.
  } catch (error) {
    // Return the error message as a server-error response.
    res.status(500).json({ message: error.message });
  }
};

// Define the asynchronous controller that retrieves one student by identifier.
const getUserById = async (req, res) => {
  // Begin handling the single-record query.
  try {
    // Find the student whose ID comes from the route parameter.
    const student = await StudentModel.findById(req.params.id);
    // Return not found when no student matches the requested ID.
    if (!student) return res.status(404).json({ message: "Not Found" });
    // Return the matching student with a successful status.
    res.status(200).json(student);
    // Handle invalid IDs and database query errors.
  } catch (error) {
    // Return the error message as a server-error response.
    res.status(500).json({ message: error.message });
  }
};

// Define the asynchronous controller that updates one student.
const updateUser = async (req, res) => {
  // Begin handling the update operation.
  try {
    // Find the student by ID and apply the submitted field changes.
    const student = await StudentModel.findByIdAndUpdate(
      // Read the student ID from the route parameter.
      req.params.id,
      // Use the submitted request body as the update data.
      req.body,
      // Return the updated document and enforce schema validators.
      { new: true, runValidators: true },
    );
    // Return not found when no student matches the requested ID.
    if (!student) return res.status(404).json({ message: "Not found" });
    // Return the updated student with a successful status.
    res.status(200).json(student);
    // Handle invalid IDs, validation, and database errors.
  } catch (error) {
    // Return the error message as a bad-request response.
    res.status(400).json({ message: error.message });
  }
};

// Define the asynchronous controller that deletes one student.
const deleteUser = async (req, res) => {
  // Begin handling the delete operation.
  try {
    // Delete the student whose ID comes from the route parameter.
    const student = await StudentModel.findByIdAndDelete(req.params.id);
    // Return not found when no student matches the requested ID.
    if (!student) return res.status(404).json({ message: "Not found" });
    // Confirm that the student was deleted successfully.
    res.status(200).json({ message: "Deleted" });
    // Handle invalid IDs and database errors.
  } catch (error) {
    // Return the error message as a server-error response.
    res.status(500).json({ message: error.message });
  }
};

// Export every student controller for use by the student routes.
module.exports = {
  // Export the controller that retrieves all students.
  retrieveUser,
  // Export the controller that creates a student.
  createUser,
  // Export the controller that retrieves one student.
  getUserById,
  // Export the controller that updates a student.
  updateUser,
  // Export the controller that deletes a student.
  deleteUser,
};
