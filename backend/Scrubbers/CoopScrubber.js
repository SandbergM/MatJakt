const Scrubber = require("./Scrubber");
const Translator = require("../Shared/Translator");
const translations = Translator.translations;

module.exports = class CoopScrubber extends Scrubber {
  static translateSchema = {
    name: (x) => x.name,
    storeId: (x) => this.stringToObjectId("5f59e826f158c91676980f44"),
    categoryIds: (x) => this.getCategoryIds(x),
    brand: (x) => x.manufacturer,
    price: (x) => x.price.value,
    packagingSize: (x) => parseInt(x.packageSize),
    pricePerUnit: (x) =>
      parseFloat(
        x.comparisonPrice.formattedValue
          .replace(/[^\d:-]/g, "")
          .replace(":", ".")
      ),
    quantityType: (x) => x.packageSizeUnit,
    discount: (x) => x.potentialPromotions,
    labels: (x) => this.getLabels(x),
    isEcological: (x) => this.getEcological(x),
    countryOfOrigin: (x) => (x.fromSweden ? "Sweden" : "Other"), //TODO: Can't find the specific country on Coop if not from Sweden - it seems to be in some of the product titles though
    imageUrl: (x) =>
      x.images[0].url.slice(0, x.images[0].url.length - 5) + ".jpg",
  };

  static getCategoryIds(product) {
    const ids = [];
    product.categories.forEach((category) => {
      if (translations.has(category.code)) { ids.push(+translations.get(category.code).category) }
    })
    return [...new Set(ids)];
  }

  static getPricePerUnit(productPrice, productUnit) {
    return productPrice;
  }

  static getLabels(product) {
    let labels = [];
    let unwanted = ["övriga", "eko", "att", "med"]; //ignore these words
    let undercategories = product.categories.slice(-2); //only take the last two undercategories in the array of categories

    for (let category of undercategories) {
      category.name
        .toLowerCase()
        .split(" ")
        .forEach((x) => {
          if (
            x.length > 1 &&
            x.length === x.replace(/[-&]/g, "").length &&
            !unwanted.includes(x)
          ) {
            labels.push(x.replace(/[,]/g, ""));
          }
        });
    }

    //add product name to the labels as well
    product.name
      .toLowerCase()
      .split(" ")
      .forEach((x) => {
        if (
          x.length > 1 &&
          x.length === x.replace(/[-&]/g, "").length &&
          !unwanted.includes(x)
        ) {
          labels.push(x.replace(/[,]/g, ""));
        }
      });

    return [...new Set(labels)];
  }

  static getEcological(product) {
    if (product.name.includes("Eko")) {
      return true;
    }
    return false;
  }
};
