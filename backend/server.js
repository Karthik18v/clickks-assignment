const express = require("express");
const db = require("./db");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000;
const JWT_SECRET = "Karthik"; // Use environment variable in production!

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3004", // React app origin
  credentials: true,                // Allow cookies to be sent/received
}));

// Login Endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const selectedUserQuery = "SELECT * FROM users WHERE email = ?";
  db.get(selectedUserQuery, [email], (err, user) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,    // true in production (with HTTPS)
      sameSite: "lax",  // adjust as needed
      maxAge: 3600000,  // 1 hour
    });

    res.json({ message: "Login successful" });
  });
});

// Register Endpoint
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    function (err) {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({
        message: "User registered successfully",
        userId: this.lastID,
      });
    }
  );
});

// Logout Endpoint
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,    // true in production
    sameSite: "lax",  // match settings used in login
  });
  res.json({ message: "Logout successful" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
