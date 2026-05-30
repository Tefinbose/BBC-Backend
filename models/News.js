const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    content: String,
    image: String,
    category: String,
    status: {
      type: String,
      default: "draft",
    },
    scheduledAt: Date,
  },
  { timestamps: true }, 
);

module.exports = mongoose.model("News",newsSchema)