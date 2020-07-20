const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: { type: String, unique: true },
	password: String,
}, { strict: false });

module.exports = mongoose.model("User", UserSchema);