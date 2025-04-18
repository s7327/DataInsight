const express = require("express");
const cors = require("cors");
const app = express();

// Update the CORS configuration to match your frontend IP address
app.use(cors({
  origin: 'http://192.168.1.3:8080',  // Replace with the exact origin of your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());  // Parse JSON request bodies

// Example route for signup
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  // Handle the signup logic here
  res.status(200).json({ message: "User signed up successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
