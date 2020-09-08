const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryTranslationSchema = new Schema({
    _id: { type: String, required: true },
    categoryName: { type: String, required: true }
});

module.exports = mongoose.model('categories', categoryTranslationSchema);