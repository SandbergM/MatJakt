const Scrubber = require("./Scrubber");
const Translator = require("../Shared/Translator");
const { removePrimitiveDuplicates } = require("../Shared/Helpers");
const translations = Translator.translations;

module.exports = class IcaScrubber extends Scrubber {
  static translateSchema = {
    name: (x) => x.name,
    storeId: (x) => "5f59e688f158c91676980f43",
    categoryIds: (x) => translate(x.inCategories, "category"),
    brand: (x) => x.brand,
    price: (x) => (x.price === undefined ? "N/A" : x.price),
    packagingSize: (x) => getpackagingSize(x.name),
    pricePerUnit: (x) => (x.compare === undefined ? "N/A" : x.compare.price),
    quantityType: (x) => getQuantityType(x.name),
    discount: (x) => x.promotions, // TODO
    labels: (x) => translate(x.inCategories, "label"),
    isEcological: (x) =>
      x.markings.environmental === undefined
        ? false
        : ecologicalCheck(x.markings.environmental),
    countryOfOrigin: (x) =>
      x.countryOfOrigin === undefined ? "N/A" : x.countryOfOrigin.name,
    imageUrl: (x) =>
      `https://assets.icanet.se/t_product_large_v1,f_auto/${x.sku}.jpg`,
  };
};

function ecologicalCheck(markings) {
  for (let i = 0; i < markings.length; i++) {
    if (markings[i].code === "EU_ORGANIC_FARMING") {
      return true;
    }
  }
  return false;
}
function getQuantityType(productName) {
  productName = productName.replace(/[0-9]/g, "_");
  for (let i = 0; i < productName.length - 1; i++) {
    if (productName[i] === "_") {
      switch (productName[i + 1].toUpperCase()) {
        case "G":
          return "GRM";
        case "M":
          return "MLT";
        case "D":
          return "DL";
        case "K":
          return "KG";
        case "L":
          return "LTR";
      }
    }
  }
  return "ST";
}
function getpackagingSize(productName) {
  productName = productName.replace(/[%]/g, "").split(" ");
  let measurements = ["g", "ml", "dl", "kg", "cl", "l"];
  for (let i = 0; i < productName.length; i++) {
    if (measurements.includes(productName[i].replace(/[0-9]/g, ""))) {
      return productName[i].replace(/[^0-9]/g, "");
    }
  }
  return "st";
}

const translate = (categories, type) => {
  let arr = [];

  categories.forEach((category) => {
    if (translations.has(category.slug)) {
      let x = translations.get(category.slug)[type].split(",");
      x.forEach((label) => {
        arr.push(label);
      });
    }
    if (category.path) {
      category.path.forEach((subCategory) => {
        if (translations.has(subCategory.slug)) {
          let x = translations.get(subCategory.slug)[type].split(",");
          x.forEach((label) => {
            arr.push(label);
          });
        }
      });
    }
  });
  return removePrimitiveDuplicates(arr);
};
