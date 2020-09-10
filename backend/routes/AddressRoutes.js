"use strict";
module.exports = function (app) {
    const addressController = require("../controllers/AddressController");

    app
        .route("/addresses")
        .get(addressController.get_all_addresses)
        .post(addressController.create_one_address);

    app
        .route("/addresses/:addressId")
        .get(addressController.find_address_by_id)
        .put(addressController.update_one_address);
};