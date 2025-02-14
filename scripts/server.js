require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB Atlas (or use local MongoDB)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("🔥 Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));
