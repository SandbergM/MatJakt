"use strict";
module.exports = function (app) {
  const productRoutes = require("../controllers/ProductController");

  //TODO: Routes
  app
    .route("/products")
    .get(productRoutes.get_all_products)
    .post(productRoutes.create_one_product);

  app
    .route("/products/:productId")
    .get(productRoutes.get_one_product)
    .put(productRoutes.update_one_product);
};
