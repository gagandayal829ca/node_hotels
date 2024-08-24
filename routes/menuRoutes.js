const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem");

router.get("/", async (req, res) => {
  try {
    const response = await MenuItem.find();

    res.status(200).json({
      message: "SUCCESS",
      menuItem: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "FAILURE",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const newMenuItem = new MenuItem(data);

    const response = await newMenuItem.save();

    res.status(200).json({
      message: "SUCCESS",
      menuItem: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "FAILURE",
      error: error.message,
    });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;

    const response = await MenuItem.find({ taste: taste });

    if (!response) {
      res.status(404).json({
        error: "Enter the correct taste value",
      });
    }

    res.status(200).json({
      message: "SUCCESS",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const itemId = req.params.id;

  const updateItem = req.body;

  const response = await MenuItem.findByIdAndUpdate(
    { _id: itemId },
    updateItem,
    {
      new: true,
      runValidations: true,
    }
  );

  if (!response) {
    res.status(404).json({
      error: "Item not found",
    });
  }

  res.status(200).json({
    message: "SUCCESS",
    data: response,
  });
});

router.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    const response = await MenuItem.findByIdAndDelete({ _id: itemId });

    if (!response) {
      res.status(404).json({
        error: "Not found",
      });
    }

    res.status(200).json({
      message: "SUCCESS",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
