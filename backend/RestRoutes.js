"use strict";
module.exports = function (app) {
  var restRoute = require("./RestController");

  //TODO: Routes
  app
    .route("/products")
    .get(restRoute.get_all_products)
    .post(restRoute.create_one_product);

  app
    .route("/products/:productId")
    .get(restRoute.get_one_product)
    .put(restRoute.update_one_product);
};
