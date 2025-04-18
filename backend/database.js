const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./database');  // Import the database connection

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Registration route (Sign Up)
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if the user already exists
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (row) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user in the database
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.run(sql, [email, hashedPassword], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
