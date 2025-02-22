import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; 
import researchRoutes from "./routes/research.js";
import adminRoutes from "./routes/admin.js"; // Ensure the path is correct
import { authMiddleware } from "./middlewares/auth.js";
import Research from "./models/research.js"; // Use import instead of require

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); // For handling cookies

// Set up EJS
app.set("view engine", "ejs");

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/college_website"; // Replace with actual MongoDB URI
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB", MONGO_URI))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/admin", adminRoutes);
app.use("/admin/research", authMiddleware, researchRoutes);

// Home Page Route
app.get("/", async (req, res) => {
    try {
        const researchItems = await Research.find({}); // Fetch Research data
        res.render("index", { researchItems }); // Pass data to index.ejs
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Start Server (Only one instance)
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});
