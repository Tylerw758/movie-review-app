/*
  Handles authentication logic:
  - register a new user
  - log in an existing user
*/

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic check to make sure both fields were sent
    if (!username || !password) {
      return res.status(400).json({ message: "Please enter username and password" });
    }

    const trimmedUsername = username.trim();

    // Check if the username is already taken
    const existingUser = await User.findOne({ username: trimmedUsername });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a normal user
    const user = await User.create({
      username: trimmedUsername,
      password: hashedPassword
    });

    // Send back user info and token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while registering user" });
  }
};

// @desc    Log in a user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic check to make sure both fields were sent
    if (!username || !password) {
      return res.status(400).json({ message: "Please enter username and password" });
    }

    const trimmedUsername = username.trim();

    // Find the user by username
    const user = await User.findOne({ username: trimmedUsername });

    // Compare entered password with hashed password in database
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id, user.role)
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error while logging in" });
  }
};