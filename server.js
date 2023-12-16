const fs = require("fs"); //import required modules
const path = require("path");
const express = require("express");

const app = epress();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true})); //middleware to handle data parsing
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => { //GET /notes should return the notes.html file
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => { //GET * should return the index.html file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//GET /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to read notes from the server' });
        } else {
            let notes = []; 

            try {
                notes = JSON.parse(data);
            } catch (parseError) {
                console.error(parseError);
                res.status(500).json({ error: 'Failed to parse notes from the server'});
            }
            res.json(notes);
        }
    });
});

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    //Generate a unique id for the new note (using a library like 'uuid')
    const newNoteId = generateUniqueId();

    newNote.id = newNoteId;

    fs.readFile()
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});