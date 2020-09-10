const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryTranslationSchema = new Schema({
    _id: { type: String, required: false },
    categoryTranslation: { type: String, required: false }
});

module.exports = mongoose.model('categorytranslation', categoryTranslationSchema);