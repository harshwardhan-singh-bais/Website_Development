import express from "express";
import  Research  from "../models/research.js";
import { upload } from "../config/cloudinary.js"; // ✅ Use ES module import

const router = express.Router();

// ✅ 1️⃣ GET all research items (Render in EJS)
router.get("/", async (req, res) => {
    try {
        const researchItems = await Research.find({});
        res.render("research", { researchItems }); // Pass data to EJS
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// ✅ 2️⃣ POST a new research item (Admin Only) with Image Upload
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const imageUrl = req.file ? req.file.path : ""; // Cloudinary URL

        const newResearch = new Research({ title, description, imageUrl, category });
        await newResearch.save();

        res.redirect("/admin/research"); // Redirect to admin research page
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to add research item.");
    }
});

// ✅ 3️⃣ DELETE a research item (Admin Only)
router.delete("/:id", async (req, res) => {
    try {
        await Research.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Failed to delete item" });
    }
});

export default router;
