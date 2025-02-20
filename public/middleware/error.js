const handleErrors = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === "ValidationError") {
        return res.status(400).json({ error: "Invalid data format." });

    }

    if (err.name === "MongoError") {
        return res.status(500).json({ error: "Database error, please try again later." });
    }

    res.status(500).json({ error: "Something went wrong, please try again later." });
};

module.exports = handleErrors;