"use strict";
module.exports = function (app) {
    const categoriesRoute = require("../controllers/CategoryController");

    app
        .route("/categories")
        .get(categoriesRoute.get_all_categories)
        .post(categoriesRoute.create_one_category);

    app
        .route("/categories/:categoryId")
        .get(categoriesRoute.find_category_by_id)
        .put(categoriesRoute.update_one_category);
};
