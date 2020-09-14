const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");
const { getRandomNumber } = require("../Shared/Helpers");

module.exports = class WillysScrubber extends Scrubber {
  detailedProduct;

  static translateSchema = {
    name: (x) => x.name,
    categoryId: async (x) => await this.getCategoryId(x.code),
    storeId: (x) => "Willys", // TODO: Add real storeId
    brand: (x) => x.manufacturer,
    price: (x) => x.priceValue,
    packagingSize: (x) =>
      this.convertSize(
        this.getVolumeUnit(x.displayVolume),
        this.getVolume(x.displayVolume)
      ),
    pricePerUnit: (x) => parseFloat(x.comparePrice.replace(/,/, ".")),
    quantityType: (x) => x.comparePriceUnit,
    discount: (x) => x.savingsAmount,
    labels: async (x) => await this.getLabels(x.code),
    isEcological: (x) => x.labels.includes("ecological"),
    countryOfOrigin: (x) => this.getCountryOfOrigin(x.code),
    imageUrl: (x) => x.image && x.image.url,
  };

  async getDetailedProduct(productCode) {
    return this.detailedProduct && this.detailedProduct.code === productCode
      ? this.detailedProduct
      : await this.fetchDetailedProduct(productCode);
  }

  // Fetches the detailed product view
  async fetchDetailedProduct(productCode) {
    let productUrl = `https://www.willys.se/axfood/rest/p/${productCode}?avoidCache=${getRandomNumber()}`;
    let rawProduct = await fetch(productUrl);
    let product;
    try {
      product = await rawProduct.json();
    } catch {
      product = null;
    }
    this.detailedProduct = product;
    return this.detailedProduct;
  }

  // TODO: Add logic
  async getCategoryId(productCode) {
    // let product = await this.getDetailedProduct(productCode);
    // if (product) {
    //   return "CategoryId";
    // }
    return "Not found";
  }

  // TODO: Add logic
  async getLabels(productCode) {
    // let product = await this.getDetailedProduct(productCode);
    // if (product) {
    //   return ["This", "is", "a", "label"];
    // }
    return ["Not found"];
  }

  async getCountryOfOrigin(productCode) {
    let product = await this.getDetailedProduct(productCode);
    return product && product.tradeItemCountryOfOrigin;
  }

  getVolume(displayVolume) {
    let regex = /[^\d.]/g;
    let volume = displayVolume.replace(regex, "");
    return parseFloat(volume);
  }

  getVolumeUnit(displayVolume) {
    let regex = /^([\S]*\s?\d+[.]?\d*)/;
    return displayVolume.replace(regex, "").toLowerCase();
  }
};
