const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoCompleteSuggestionSchema = new Schema({
    word: { type: String, required: true },
    timesUsed: { type: Number, required: true },
    categoryId: { type: Array },
});

const AutoCompleteSuggestion = mongoose.model('autoCompleteSuggestion', autoCompleteSuggestionSchema);
module.exports = AutoCompleteSuggestion;