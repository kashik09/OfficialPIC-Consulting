const path = require("path");

module.exports = (err, req, res, next) => {
    console.error(`[ERROR ${err.status || 500}]: ${err.message}`);

    const statusCode = err.status || 500;

    // Only serve 404 and 500 error pages
    if (statusCode === 404) {
        return res.status(404).sendFile(path.join(__dirname, "404.html"));
    } 
    if (statusCode >= 500) {
        return res.status(500).sendFile(path.join(__dirname, "500.html"));
    }

    // For all other errors, just send JSON (to be handled by toasts)
    return res.status(statusCode).json({
        success: false,
        erorss: [err.message || "An unexpected error occurred."]
    });
};
