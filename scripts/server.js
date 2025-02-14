// Load environment variables from .env file (ensures database credentials are secure)
require("dotenv").config({ path: "../.env" });

const express = require("express"); // Import Express framework for handling HTTP requests
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction
const cors = require("cors"); // Import CORS to allow cross-origin requests
const bodyParser = require("body-parser"); // Import Body-Parser to parse JSON data from requests
const FormSubmission = require("../models/formSubmission"); // Import the Mongoose model for form submissions

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

// API Route to Handle Form Submission (POST Request)
app.post("/submit-form", async (req, res) => {
    // Extract name, email, and message from the request body
    const { name, email, message } = req.body;

    // Validate that all required fields are present
    if (!name || !email || !message) {
        return res.redirect("/400.html"); // Redirect to a custom 400 error page
    }

    try {
        // Create a new form submission instance
        const newSubmission = new FormSubmission({ name, email, message });

        // Save the submission to MongoDB
        await newSubmission.save();

        // Respond with success message
        res.json({ success: "Form submitted successfully!" });
    } catch (error) {
        // Redirect to a custom 500 error page on server error
        res.redirect("/500.html");
    }
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));