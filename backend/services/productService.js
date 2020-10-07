const { Product } = require("../models/product");

module.exports = class ProductService {
  static async findProductsByQuery(query) {
    const products = await Product.find(query)
      .sort({
        pricePerUnit: "asc",
      })
      .lean();
    return products;
  }
};
