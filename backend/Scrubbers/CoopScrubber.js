const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");

module.exports = class CoopScrubber extends Scrubber {
  //TODO EXCHANGE THIS ARRAY WITH CATEGORIES FROM THE DB
  matJaktCategories = [
    { categoryName: "Mejeri & Ägg", id: 0 },
    { categoryName: "Ost", id: 1 },
    { categoryName: "Frukt & Grönsaker", id: 2 },
    { categoryName: "Skafferi", id: 3 },
    { categoryName: "Kött & Fågel", id: 4 },
    { categoryName: "Chark & Pålägg", id: 5 },
    { categoryName: "Vegetariskt", id: 6 },
    { categoryName: "Fisk & Skaldjur", id: 7 },
    { categoryName: "Dryck", id: 8 },
    { categoryName: "Bröd & Bageri", id: 9 },
    { categoryName: "Smaksättare", id: 10 },
    { categoryName: "Färdigmat", id: 11 },
    { categoryName: "Hem & Hushåll", id: 12 },
    { categoryName: "Frys", id: 13 },
    { categoryName: "Barn", id: 14 },
    { categoryName: "Skönhet & Hygien", id: 15 },
    { categoryName: "Hälsa & Tillskott", id: 16 },
    { categoryName: "Tobak", id: 17 },
    { categoryName: "Husdjur", id: 18 },
    { categoryName: "Världens Mat", id: 19 },
    { categoryName: "Övrigt", id: 20 },
  ];

  static translateSchema = {
    name: (x) => x.name,
    storeId: (x) => "5f59e826f158c91676980f44",
    categoryIds: (x) => this.getCategoryIds(x),
    brand: (x) => x.manufacturer,
    price: (x) => x.price.value,
    packagingSize: (x) => x.packageSize,
    pricePerUnit: (x) =>
      x.comparisonPrice.formattedValue
        .replace(/[^\d:-]/g, "")
        .replace(":", "."),
    quantityType: (x) => x.packageSizeUnit,
    discount: (x) => x.potentialPromotions,
    labels: (x) => this.getLabels(x),
    isEcological: (x) => this.getEcological(x),
    countryOfOrigin: (x) => (x.fromSweden ? "Sweden" : "Other"), //TODO: Can't find the specific country on Coop if not from Sweden - it seems to be in some of the product titles though
    imageUrl: (x) => x.images[0].url,
  };

  static getCategoryIds(product) {
    const ids = [];
    for (let i = 0; i < this.matJaktCategories.length - 1; i++) {
      if (
        product.categories[0].name.includes(matJaktCategories[i].categoryName)
      ) {
        ids.push(matJaktCategories[i].id);
      } else {
        //If nothing fits, return the category "Övrigt"
        ids.push(matJaktCategories[matJaktCategories.length - 1]);
      }
      return ids;
    }
  }

  static getPricePerUnit(productPrice, productUnit) {
    //productPrice = x.comparisonPrice.formattedValue.replace(/[^\d:-]/g, "").replace(":", "."),
    //productUnit = x.comparisonPrice.formattedValue.substr(x.comparisonPrice.formattedValue.lastIndexOf("/") + 1)
    //---------------------------------------------------------------------------------------------------------
    //Currently looks like we don't need to use the productUnit to change the value of comparisonPrice, but when we find out we do need to, we can do it here
    //As far as I can see so far Coop has already done the calculating for us: productUnit is either l, kg, or st.
    return productPrice;
  }

  static getLabels(product) {
    let labels = [];
    let unwanted = ["övriga", "eko", "att", "med"]; //ignore these words
    let undercategories = product.categories.slice(-2); //only take the last two undercategories in the array of categories

    for (category of undercategories) {
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
