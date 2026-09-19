const {authController} = require("../Controllers/authController")

const express = require("express")
const router = express.Router


router.get("User", retrieveUser)

module.exports = router


