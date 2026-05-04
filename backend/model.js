const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  name: String,
  message: String
}, { timestamps: true });

const questionSchema = new mongoose.Schema({
  name: String,
  topic: String,
  question: String,
  replies: [replySchema]   // 👈 important
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);