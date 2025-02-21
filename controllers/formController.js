const { validationResult } = require("express-validator");
const FormSubmission = require("../models/FormSubmission");

exports.submitForm = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            errorType: "client", // ✅ Mark this as a client-side error
            errors: errors.array().map(err => err.msg) 
        });
    }

    try {
        const { floatingFirstName, floatingLastName, email, message } = req.body;
        const newSubmission = new FormSubmission({ floatingFirstName, floatingLastName, email, message });
        await newSubmission.save();

        res.json({ success: "Form submitted successfully!" });
    } catch (error) {
        next(error); // ✅ Forward error to global error handler
    }
};