const express = require('express');
const spellchecker = require('spellchecker');
const app = express();

// Spell check function
function checkSpelling(text) {
    const words = text.split(' ');
    const misspelled = [];
    words.forEach(word => {
        if (!spellchecker.isMisspelled(word)) {
            misspelled.push(word);
        } else {
            const suggestions = spellchecker.getCorrectionsForMisspelling(word);
            misspelled.push({ word, suggestions });
        }
    });
    return misspelled;
}

// API endpoint for spell checking
app.get('/spellcheck/:text', (req, res) => {
    const text = req.params.text;
    const result = checkSpelling(text);
    res.json(result);
});

// Start server
const PORT = process.env.PORT || 5000;

// Starting the Express server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

