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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});