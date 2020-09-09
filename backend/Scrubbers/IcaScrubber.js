const Scrubber = require("./Scrubber");
const Translator = require("../Translator");
let categoryTranslations = Translator.categories();

module.exports = class IcaScrubber extends Scrubber {
  static translateSchema = {
    name: (x) => x.name,
    store_id: (x) => "ica-supermarket-linero-torg",
    categoryId: (x) => filterCategories(x.inCategories),
    brand: (x) => x.brand,
    price: (x) => (x.price === undefined ? "N/A" : x.price),
    packagingSize: (x) => "TODO", // TODO
    pricePerUnit: (x) => (x.compare === undefined ? "N/A" : x.compare.price),
    quantityType: (x) => (x.soldInUnit === "pce" ? "st" : "kg"),
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
