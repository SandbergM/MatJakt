const { Product } = require("../models/product");

module.exports = class ProductService {
  static async findProductsByName(name) {
    const regex = new RegExp(name, "i");
    const products = await Product.find({name: regex});
    return products;
  }
}