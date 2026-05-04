const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const Question = require("./model");

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const tutorialRoutes = require("./routes/tutorials");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/notes", require("./routes/noteRoutes"));

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


////////////////////////////////////////////////////////////////////////////////


require("dotenv").config();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Send email API
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // Create transporter
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: "📩 New Contact Form Message",
        text: `
New message received:

Name: ${name}
Email: ${email}
Message: ${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Email sending failed",
            error: error.message
        });
    }
});

// POST question
app.post("/questions", async (req, res) => {
  try {
    const newQ = await Question.create(req.body);
    res.json(newQ);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all questions
app.get("/questions", async (req, res) => {
  const data = await Question.find().sort({ createdAt: -1 });
  res.json(data);
});

// ADD REPLY
app.post("/questions/:id/reply", async (req, res) => {
  try {
    const { name, message } = req.body;

    const question = await Question.findById(req.params.id);

    question.replies.push({ name, message });

    await question.save();

    res.json(question);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
