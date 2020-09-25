const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const autoCompleteSuggestionSchema = new Schema({
  word: { type: String, required: true },
  timesUsed: { type: Number, required: true },
});

module.exports = mongoose.model(
  "autocompletesuggestion",
  autoCompleteSuggestionSchema
);
