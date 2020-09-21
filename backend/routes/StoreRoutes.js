"use strict";
module.exports = function (app) {
  const storeRoute = require("../controllers/StoreController");

  app.route("/stores").get(storeRoute.getAllStores);

  app.route("/stores/:storeId").get(storeRoute.findStoreById);
};
