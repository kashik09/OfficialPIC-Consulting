require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const formRoutes = require("./routes/formRoutes"); // ✅ Import form routes
const errorHandler = require("./middleware/errorHandler"); // ✅ Import error handler

const app = express();

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

app.use("/api", formRoutes);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "404.html"));
});

// ✅ Use Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));