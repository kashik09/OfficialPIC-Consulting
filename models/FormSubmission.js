const mongoose = require("mongoose");

// Schema for Contact Form Submissions
const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FormSubmission", formSchema);