const express = require("express");
const router = express.Router();

const User = require("../models/User");

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users
// @desc    Create a new user
// @access  Public
router.post("/", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/users/:id
// @desc    Delete a user by ID
// @access  Public
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ msg: 'User deleted', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;