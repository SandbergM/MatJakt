const Scrubber = require("./Scrubber");

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
    //TODO EXCHANGE THIS ARRAY WITH CATEGORIES FROM THE DB
    const matJaktCategories = {
      "Mejeri & Ägg": 0,
      "Ost": 1,
      "Frukt & Grönsaker": 2,
      "Skafferi": 3 ,
      "Kött & Fågel": 4 ,
      "Chark & Pålägg": 5,
      "Vegetariskt": 6,
      "Fisk & Skaldjur":7,
      "Dryck" : 8,
      "Bröd & Bageri": 9,
      "Smaksättare": 10 ,
      "Färdigmat": 11 ,
      "Hem & Hushåll": 12 ,
      "Frys": 13,
      "Barn": 14 ,
      "Skönhet & Hygien": 15 ,
      "Hälsa & Tillskott": 16 ,
      "Tobak": 17 ,
      "Husdjur": 18 ,
      "Världens Mat": 19 ,
      "Övrigt": 20 ,
  };
    const ids = [];
      if (
        matJaktCategories[product.categories[0].name]
      ) {
        ids.push(matJaktCategories[product.categories[0].name]);
        console.log(matJaktCategories[product.categories[0].name]);
      } else {
        //If nothing fits, return the category "Övrigt"
        ids.push(20);
      }
      return ids;
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
