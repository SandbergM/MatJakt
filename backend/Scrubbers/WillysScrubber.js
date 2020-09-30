const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");
const CategoryTranslator = require("../Shared/CategoryTranslator");
const { getRandomNumber, removePrimitiveDuplicates } = require("../Shared/Helpers");

module.exports = class WillysScrubber extends Scrubber {
  detailedProduct;

  static translateSchema = {
    name: (x) => x.name,
    categoryIds: async (x) => await this.getCategoryIds(x.code),
    storeId: (x) => "5f59e877f158c91676980f45",
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

  // Checks if detailedProduct isn't null
  // and if the product.code matches detailedProduct.code
  // if both statements are truthy it returns the detailedProduct
  // otherwise it fetches and returns the detailed product view.
  static async getDetailedProduct(productCode) {
    return this.detailedProduct && this.detailedProduct.code === productCode
      ? this.detailedProduct
      : await this.fetchDetailedProduct(productCode);
  }

  // Fetches the detailed product view
  static async fetchDetailedProduct(productCode) {
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

  static async getCategoryIds(productCode) {
    const product = await this.getDetailedProduct(productCode);
    const translations = CategoryTranslator.categories;
    let productCategories = [];
    if (product) {
      product.breadCrumbs.forEach((b) => {
        translations.forEach((t) => {
          if (t.hasOwnProperty("categoryTranslation") && t._id == b.categoryCode) {
            productCategories.push(t.categoryTranslation);
          }
        });
      });
    }
    productCategories = removePrimitiveDuplicates(productCategories);
    return productCategories;
  }

  static async getLabels(productCode) {
    const product = await this.getDetailedProduct(productCode);
    const translations = CategoryTranslator.categories;
    let labels = []
    if (product) {
      const nameLabels = product.name.split(" ");
      labels.push(...nameLabels);
      product.breadCrumbs.forEach((b) => {
        translations.forEach((t) => {
          if (b.categoryCode === t._id) {
            labels.push(t.label);
          }
        })
      })
    }
    labels = removePrimitiveDuplicates(labels);
    return labels;
  }

  static async getCountryOfOrigin(productCode) {
    let product = await this.getDetailedProduct(productCode);
    return product && product.tradeItemCountryOfOrigin;
  }

  static getVolume(displayVolume) {
    let regex = /[^\d.]/g;
    let volume = displayVolume.replace(regex, "");
    return parseFloat(volume);
  }

  static getVolumeUnit(displayVolume) {
    let regex = /^([\S]*\s?\d+[.]?\d*)/;
    return displayVolume.replace(regex, "").toLowerCase();
  }
};
