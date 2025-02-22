import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; 
import adminRoutes from "./routes/admin.js"; // Ensure the path is correct

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
const MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.15"; // Replace with actual MongoDB URI
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB",MONGO_URI))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/calendar", (req,res)=>{
  res.render("foot/calendar.ejs")
})

app.get("/fees", (req,res)=>{
  res.render("foot/fees.ejs")
})

app.get("/reach", (req,res)=>{
  res.render("foot/reach.ejs")
})

app.get("/recruitment", (req,res)=>{
  res.render("foot/recruitment.ejs")
})

app.get("/complaints/internal",(req,res)=>{
  res.render("foot/complaints/internal.ejs")
})

app.get("/complaints/scst",(req,res)=>{
  res.render("foot/complaints/scst.ejs")
})

app.get("/complaints/anti-ragging",(req,res)=>{
  res.render("foot/complaints/anti-ragging.ejs")
})

app.get("/complaints/networking",(req,res)=>{
  res.render("foot/complaints/networking.ejs")
})

app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});
