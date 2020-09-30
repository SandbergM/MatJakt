const fetch = require("node-fetch");

module.exports = class WillysHarvester {
  static bustCache() {
    return "?avoidCache=" + (Math.random() + "").split(".")[1];
  }

  static async getCategories() {
    let raw = await fetch(
      "https://www.willys.se/leftMenu/categorytree" + this.bustCache()
    );
    let categories = await raw.json();
    return await categories.children.map((x) => x.url);
  }

  static async getProducts(categoryURL) {
    let raw = await fetch(
      "https://www.willys.se/c/" + categoryURL + this.bustCache() + "&size=3"
    );
    return (await raw.json()).results;
  }

  static async getAllProducts() {
    let categories = await this.getCategories();
    let products = [];
    for (let category of categories) {
      let x = await this.getProducts(category);
      products = [...products, ...x];
    }
    products = this.removeDuplicates(products);
    return products;
  }

  static removeDuplicates(products) {
    return Object.values(products.reduce((a, c) => (a[c.code] = c) && a, {}));
  }
};
