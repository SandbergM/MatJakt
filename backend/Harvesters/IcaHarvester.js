const fetch = require("node-fetch");

/* 
Todo, Store / Addres harvest
https://handla.ica.se/api/editorial-content/v1/store-info/store/ica-supermarket-linero-torg-id_15172
Store : name, websiteUrl, openingHours
Address : country, region, city, zipCode, streetNumber, streetName
*/

module.exports = class IcaHarvester {
  static async getCategories() {
    const storeId = "15172"; // Unique id for ica-supermarket-linero-torg
    let raw = await fetch(
      `https://handla.ica.se/api/product-info/v1/store/${storeId}/category/catalog80002`
    );
    let categories = await raw.json();

    return await categories.childCategories.map((x) => x.seoUrl);
  }

  static async getProductIds() {
    let categories = await this.getCategories();
    let productIds = [];

    for (let category of categories) {
      let res = await fetch(`
            https://handla.ica.se/api/content/v1/collections/facets/customer-type/B2C/store/ica-supermarket-linero-torg-id_15172/products?categories=${category}&sortBy=MYUSUALS&bb=true`);
      let items = await res.json();
      productIds.push(items.items);
    }

    let cleanIds = [];

    productIds.forEach((category) => {
      category.forEach((x) => {
        x["type"] === "product" ? cleanIds.push(x["id"]) : "";
      });
    });

    return cleanIds;
  }

  static async fetchProducts() {
    let productIds = await this.getProductIds();
    let products = [];
    let steps = 100;
    let adjustStepsBackAt;
    for (let i = 0; i < 10; i += steps) {
      let query = [];
      // Ica only allows you to fetch 100 products at a time
      // You have to send the productIDs in a string where you divide the ids with a comma, example : /products-data?skus=id,id,id
      // To make life easier, we push 100 IDs in the query array and then just .join(",") them.
      for (
        let j = 0;
        j < (productIds.length - i <= steps ? productIds.length - i : steps);
        j++
      ) {
        // (productIds.length - i <= 100 ? productIds.length - i : 100) is to make sure we dont go out of bounds when we loop through the array.
        query.push(productIds[i + j]);
      }

      let raw = await fetch(`
            https://handla.ica.se/api/content/v1/collection/customer-type/B2C/store/ica-supermarket-linero-torg-id_15172/products-data?skus=${query.join(
              ","
            )}`);

      let res = await raw.json();
      if (i >= adjustStepsBackAt) {
        steps = 100;
      }
      try {
        products = [...products, ...res];
      } catch (error) {
        console.log(error);
        if (res.message == "Internal server error") {
          if (steps === 100) {
            i--;
            adjustStepsBackAt = i + 99;
            steps = 1;
          }
          console.log(query.join(","));
          continue;
        }
      }
    }
    return products;
  }
};
