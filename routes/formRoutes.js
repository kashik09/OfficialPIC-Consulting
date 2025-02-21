const express = require("express");
const { body } = require("express-validator");
const { submitForm } = require("../controllers/formController"); // Import controller

const router = express.Router();

// Define the form submission route with validation middleware
router.post(
  "/submit-form",
  [
    body("floatingFirstName").trim().notEmpty().withMessage("First Name is required."),
    body("floatingLastName").trim().notEmpty().withMessage("Last Name is required."),    
    body("email").isEmail().withMessage("Enter a valid email address."),
    body("message").trim().notEmpty().withMessage("Message cannot be empty."),
  ],
  submitForm
);

module.exports = router;