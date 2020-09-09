const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    addressId: { type: mongoose.Types.ObjectId, ref: "Address", required: true },
    name: { type: String, required: true },
    websiteUrl: { type: String },
    openingHours: { type: Array },
});

const Store = mongoose.model('store', storeSchema);
module.exports = Store;