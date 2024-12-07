// models/user.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return this.password !== null;
    }, // Only require password if it's not null
  },
  status: { type: String, default: "Active" },
  profile: {
    favoriteEvents: [String], // Add other fields if necessary
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.password === null) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
