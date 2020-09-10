"use strict";
module.exports = function (app) {
    const storeRoute = require("../controllers/StoreController");

    app
        .route("/stores")
        .get(storeRoute.get_all_stores)
        .post(storeRoute.create_one_store);

    app
        .route("/stores/:storeId")
        .get(storeRoute.find_store_by_id)
        .put(storeRoute.update_one_store);
};
