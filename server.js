const fs = require('fs');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (_req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/notes', (_req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'notes.html')));
app.get('/api/notes', (_req, res) => {
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

app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
    let notes = JSON.parse(data);
    const newNotes = notes.filter((note) => note.id !== parseInt(noteId));
    fs.writeFile("db.json", JSON.stringify(newNotes), (err) => {
    if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
        return res.status(200).send("Note successfully deleted");
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});