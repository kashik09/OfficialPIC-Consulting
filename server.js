require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const formRoutes = require("./routes/formRoutes"); // ✅ Import form routes
const errorHandler = require("./middleware/errorHandler"); // ✅ Import error handler

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB Connection Error:", err));

// ✅ Use Routes (Removed the old `/submit-form` route from server.js)
app.use("/api", formRoutes);

// 404 Not Found Handler
app.use((req, res, next) => {
    const error = new Error("Resource Not Found");
    error.status = 404;
    next(error);
});

// ✅ Use Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));