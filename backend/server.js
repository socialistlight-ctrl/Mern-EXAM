require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const reviewRoutes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Feedback API is running" });
});   
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`API live → :${PORT}`)))
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });   