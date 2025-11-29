const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoItem = require("./models/TodoItem");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (local)
mongoose
  .connect("mongodb://127.0.0.1:27017/todo_db")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST /submittodoitem
app.post("/submittodoitem", async (req, res) => {
  try {
    const { itemName, itemDescription } = req.body;

    if (!itemName || !itemDescription) {
      return res
        .status(400)
        .json({ message: "itemName and itemDescription are required" });
    }

    const newItem = new TodoItem({ itemName, itemDescription });
    await newItem.save();

    res.status(201).json({
      message: "To-Do item saved successfully",
      item: newItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

