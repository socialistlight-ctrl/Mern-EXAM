const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true, trim: true },
  duration: { type: String, default: "—" },
  note: { type: String, required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);   