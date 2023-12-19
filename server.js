// Required Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
// Landing Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Notes Page - Existing Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// API routes for getting and saving notes
app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
    newNote.id = notes.length + 1;
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes));
    res.json(newNote);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});