module.exports = (err, req, res, next) => {
    console.error(`[ERROR]: ${err.message}`);

    const statusCode = err.status || 500;
    
    res.status(statusCode).json({
        errorType: statusCode >= 500 ? "server" : "client",
        success: false,
        message: err.message || "Something went wrong. Please try again later.",
    });
};