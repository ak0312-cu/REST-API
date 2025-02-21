const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Hardcoded user details
const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// GET route
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST route
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const numbers = data.filter(item => /^\d+$/.test(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

    // Find the highest alphabet (case-insensitive)
    const highestAlphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a, 'en', { sensitivity: 'base' }))[0]] : [];

    res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highestAlphabet
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
