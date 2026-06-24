const express = require("express");
const app = express();
const noteModel = require("./models/notes.model");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));


// CREATE NOTE
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    const note = await noteModel.create({
      title,
      description,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// GET ALL NOTES
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await noteModel.find();

    res.status(200).json({
      message: "Notes fetched successfully",
      notes,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// DELETE NOTE
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await noteModel.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// UPDATE DESCRIPTION
app.patch("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// REACT ROUTE HANDLER
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

module.exports = app;