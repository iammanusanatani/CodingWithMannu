const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    videoUrl: String,
    createdBy: { type: String, default: "admin" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tutorial", tutorialSchema);