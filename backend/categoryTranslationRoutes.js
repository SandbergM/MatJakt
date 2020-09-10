"use strict";
module.exports = function (app) {
    var restRoute = require("./categoryTranslationController");

    app
        .route("/categoryTranslation/:id")
        .get(restRoute.categoryTranslation_by_id)
    app
        .route("/categoryTranslation")
        .get(restRoute.categoryTranslation_all)
};
