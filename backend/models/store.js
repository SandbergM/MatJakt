const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    addressId: { type: mongoose.Types.ObjectId, ref: "Address", required: true },
    name: { type: String, required: true },
    websiteUrl: { type: String },
    openingHours: { type: Array },
});

module.exports = mongoose.model('store', storeSchema);