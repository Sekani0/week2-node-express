require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. BONUS: Custom Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
});

// 2. Core Requirements: JSON parsing & Serving static HTML page at /
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 3. API Routes

// GET / -> Serves the static HTML page natively via express.static, 
// but if you also need a fallback/explicit text endpoint:
app.get('/api-info', (req, res) => {
    res.send("My Week 2 API!");
});

// POST /user -> Accepts {name, email}; responds "Hello, [name]!"
app.post('/user', (req, res) => {
    const { name, email } = req.body;

    // Error handling: 400 for missing data
    if (!name || !email) {
        return res.status(400).json({ error: "Missing required fields: name and email are mandatory." });
    }

    res.send(`Hello, ${name}!`);
});

// GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ${userId} profile`);
});

// 4. Centralized Error Handling Middleware (Fallback)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});