const Scrubber = require("./Scrubber");
const Translator = require("../Shared/Translator");
let categoryTranslations = Translator.categories();

module.exports = class IcaScrubber extends Scrubber {
  static translateSchema = {
    name: (x) => x.name,
    store_id: (x) => "ica-supermarket-linero-torg",
    categoryId: (x) => filterCategories(x.inCategories),
    brand: (x) => x.brand,
    price: (x) => (x.price === undefined ? "N/A" : x.price),
    packagingSize: (x) => x.price / x.compare.price, // TODO
    pricePerUnit: (x) => x.compare.price,
    quantityType: (x) => x.compare.priceText.slice(x.compare.priceText.lastIndexOf('/') + 1, x.compare.priceText.length),
    discount: (x) => x.promotions, // TODO
    labels: (x) => "N/A", // TODO
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
async function filterCategories(categories) {
  let productCategoryArray = [];
  categories.forEach((category) => {
    categoryTranslations.has(category.slug)
      ? productCategoryArray.push(categoryTranslations.get(category.slug))
      : "";
    if (category.path) {
      category.path.forEach((subCategory) => {
        categoryTranslations.has(subCategory.slug)
          ? productCategoryArray.push(
            categoryTranslations.get(subCategory.slug)
          )
          : "";
      });
    }
  });
  return [...new Set(productCategoryArray)];
}

function ecologicalCheck(markings) {
  for (let i = 0; i < markings.length; i++) {
    if (markings[i].code === "EU_ORGANIC_FARMING") {
      return true;
    }
  }
  return false;
}
