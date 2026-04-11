const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if(!user) return res.status(404).json({ error: "User not found" });

        res.json({ message: user.role === "admin" ? "Welcome Admin" : "Welcome User", user });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;