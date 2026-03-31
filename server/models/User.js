/*
  Defines what a User looks like in MongoDB.
  - username
  - password
  - role (admin or user)
*/

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Username for login
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    // Hashed password will be stored here
    password: {
      type: String,
      required: true
    },

    // Role decides what the user is allowed to do
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt automatically
  }
);

const User = mongoose.model("User", userSchema);

export default User;