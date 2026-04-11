const express = require("express");
const router = express.Router();
const Tutorial = require("../models/Tutorial");

// Get all tutorials
router.get("/", async (req,res)=>{
    try{
        const tutorials = await Tutorial.find().sort({ createdAt: -1 });
        res.json(tutorials);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

// Add tutorial (Admin only)
router.post("/add", async (req,res)=>{
    try{
        const { title, description, videoUrl } = req.body;
        const tutorial = new Tutorial({ title, description, videoUrl });
        await tutorial.save();
        res.json({ message: "Tutorial added successfully" });
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;