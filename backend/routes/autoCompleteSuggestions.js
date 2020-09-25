const AutoCompleteSuggestion = require('../models/autoCompleteSuggestion');

const express = require('express');
const router = express.Router();

router.get('/word=:word', (req, res) => {
    AutoCompleteSuggestion.find({ $query: { word: { $regex: req.params.word, $options: "i" } }, },
        function (err, result) {
            if (err) res.send(err);
            res.send(result)
        })
        .sort({ timesUsed: -1 })
        .limit(5);
});

module.exports = router;


