const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    storeId: { type: mongoose.Types.ObjectId, ref: "Store", required: true },
    categoryId: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
    brand: { type: String },
    price: { type: Number, required: true },
    packagingSize: { type: Number },
    pricePerUnit: { type: Number },
    quantityType: { type: String },
    discount: { type: Array },
    labels: { type: Array },
    isEcological: { type: Boolean, required: true },
    countryOfOrigin: { type: String },
    imageUrl: { type: String }
});

module.exports = mongoose.model('product', productSchema);