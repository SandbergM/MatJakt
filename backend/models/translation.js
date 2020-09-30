const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const translation = new Schema({
  _id: { type: String, required: false },
  categoryTranslation: { type: String, required: false },
  label: { type: String, required: false },
});

module.exports = mongoose.model("translation", translation);
