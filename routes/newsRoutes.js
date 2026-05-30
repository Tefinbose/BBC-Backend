const express = require("express");
const news = require("../models/News");
const News = require("../models/News");

const router = express.Router();

// Create News
router.post("/", async (req, res) => {
  const news = await News.create(req.body);
  res.json(news);
});

// Get all News
router.get("/", async (req, res) => {
  const news = await News.find();
  res.json(news);
});

// Get News by Category
router.get("/category/:category", async (req, res) => {
  try {
    const news = await News.find({
      category: req.params.category,
    });
    res.json(news);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Single News

router.delete("/:id", async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    res.json(200).json({
      message: "News deleted Successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    res.status(200).json(news);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedNews);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
});

module.exports = router;
