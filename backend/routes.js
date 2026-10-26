const express = require("express");
const Review = require("./models/Review");
const router = express.Router();

// list everything, newest first
router.get("/", async (_req, res) => {
  try {
    const docs = await Review.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// create
router.post("/", async (req, res) => {
  try {
    const { courseTitle, duration, note, score } = req.body;
    const doc = await Review.create({ courseTitle, duration, note, score });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// update by id
router.put("/:id", async (req, res) => {
  try {
    const doc = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete by id
router.delete("/:id", async (req, res) => {
  try {
    const doc = await Review.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;   