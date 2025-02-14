require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const FormSubmission = require("../models/formSubmission");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB Connection Error:", err));

app.post("/submit-form", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required."});
    }

    try {
        const newSubmission = new formSubmission({ name, email, message});
        await newSubmission.save();
        res.json({ success: "Form submitted successfully!"});
    } catch (error) {
        res.status(500).json({ error: "Server error, try again later."});
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));