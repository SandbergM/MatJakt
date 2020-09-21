"use strict";
module.exports = function (app) {
  const addressController = require("../controllers/AddressController");

  app.route("/addresses").get(addressController.getAllAddresses);

  app.route("/addresses/:addressId").get(addressController.findAddressById);
};
