const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    store_id: { type: mongoose.Types.ObjectId, ref: "Store", required: true },
    name: { type: String, required: true },
    brand: { type: String },
    countryOfOrigin: { type: String },
    category_id: { type: Array },
    price: { type: Number, required: true },
    pricePerUnit: { type: Number },
    quantityType: { type: String },
    discount: { type: Array },
    labels: { type: Array },
    isEcological: { type: Boolean, required: true },
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;