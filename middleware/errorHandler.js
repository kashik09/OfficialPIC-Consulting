module.exports = (err, req, res, next) => {
    console.error(`[ERROR]: ${err.message}`);

    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

const errorHandler = require("./middleware/errorHandler"); // Import error handler

// 404 Not Found Handler
app.use((req, res, next) => {
    const error = new Error("Resource Not Found");
    error.status = 404;
    next(error);
});

// Global Error Handling Middleware (Must Be After Routes)
app.use(errorHandler);