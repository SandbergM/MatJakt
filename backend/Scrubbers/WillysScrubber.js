const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");
const { getRandomNumber } = require("../Shared/Helpers");

module.exports = class WillysScrubber extends Scrubber {
  static translateSchema = {
    name: (x) => x.name,
    categoryId: (x) => this.getCategoryId(x),
    storeId: (x) => "Willys",
    brand: (x) => x.manufacturer,
    price: (x) => x.priceValue,
    pricePerUnit: (x) => parseFloat(x.comparePrice.replace(/,/, ".")),
    quantityType: (x) => x.comparePriceUnit,
    discount: (x) => x.savingsAmount,
    labels: (x) => this.getLabels(x),
    isEcological: (x) => x.labels.includes("ecological"),
    countryOfOrigin: async (x) => await this.getCountryOfOrigin(x.code),
  };

  static getCategoryId(product) {
    return "CategoryId";
  }

  static getLabels(product) {
    return ["This", "is", "a", "label"];
  }

  static async getCountryOfOrigin(productCode) {
    let productUrl = `https://www.willys.se/axfood/rest/p/${productCode}?avoidCache=${getRandomNumber()}`;
    let rawProduct = await fetch(productUrl);
    let product = await rawProduct.json();
    return product.tradeItemCountryOfOrigin;
  }
};
