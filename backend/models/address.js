const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    country: { type: String },
    region: { type: String },
    city: { type: String },
    zipCode: { type: String },
    streetNumber: { type: String },
    streetName: { type: String },
});

const Address = mongoose.model('address', addressSchema);
module.exports = Address;