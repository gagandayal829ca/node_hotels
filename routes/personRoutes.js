const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.post("/signup", async (req, res) => {
  const data = req.body;

  try {
    const newPerson = new Person(data);

    const response = await newPerson.save();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Person.find();

    res.status(200).json({
      persons: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:workType", async (req, res) => {
  const workType = req.params.workType;

  try {
    if (workType == "Chef" || workType == "Lead" || workType == "Manager") {
      const response = await Person.find({ work: workType });

      res.status(200).json({
        message: "SUCCESS",
        data: response,
      });
    } else {
      res.status(404).json({
        message: "Invalid work type",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "FAILURE",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const updatedPerson = req.body;

    const response = await Person.findByIdAndUpdate(
      { _id: personId },
      updatedPerson,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      res.status(404).json({
        message: "Person not found",
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

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete({ _id: personId });

    if (!response) {
      res.status(404).json({
        error: "User not found",
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
