// Load environment variables from .env file (ensures database credentials are secure)
require("dotenv").config();

const express = require("express"); // Import Express framework for handling HTTP requests
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction
const cors = require("cors"); // Import CORS to allow cross-origin requests
const bodyParser = require("body-parser"); // Import Body-Parser to parse JSON data from requests
const FormSubmission = require("../../models/FormSubmission"); // Import the Mongoose model for form submissions

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 5000; // Set the server port, using environment variable or default to 5000

// Middleware Setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) to allow frontend to communicate with backend
app.use(bodyParser.json()); // Parse incoming JSON request bodies

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Use the new MongoDB URL parser
    useUnifiedTopology: true, // Use the new server discovery & monitoring engine
})
.then(() => console.log("Connected to MongoDB")) // Log success message when connected
.catch(err => console.log("MongoDB Connection Error:", err)); // Log error if connection fails

const { body, validationResult } = require("express-validator");
const path = require("path"); // Required to resolve file paths

app.post(
  "/submit-form",
  [
    body("floatingFirstName").trim().notEmpty().withMessage("First Name is required."),
    body("floatingLastName").trim().notEmpty().withMessage("Last Name is required."),    
    body("email").isEmail().withMessage("Enter a valid email address."),
    body("message").trim().notEmpty().withMessage("Message cannot be empty."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Redirect to your custom error page instead of returning JSON
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }

    try {
      const { name, email, message } = req.body;
      const newSubmission = new FormSubmission({ name, email, message });
      await newSubmission.save();

      res.json({ success: "Form submitted successfully!" }); // Adjust as needed
    } catch (error) {
      next(error); // Forward error to global handler
  }
  }
);
  
// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));