"use strict";
module.exports = function (app) {
  const productRoutes = require("../controllers/ProductController");

  //TODO: Routes
  app.route("/products").get(productRoutes.getAllProducts);

  app.route("/products/:productId").get(productRoutes.findProductById);
};
