const express = require("express")

const { retrieveUser, createUser, getUserById, updateUser, deleteUser} = require("../Controllers/usersController")

const router = express.Router()

// routes
router.get("/student", retrieveUser)
router.post("/student", createUser)
router.get("/students/:id", getUserById);
router.post("/students", updateUser)
router.post("/students", deleteUser)

module.exports = router




