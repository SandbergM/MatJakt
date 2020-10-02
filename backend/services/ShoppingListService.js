const ProductService = require("./ProductService");

module.exports = class ShoppingListService {
  static storeIds = [
    "5f59e877f158c91676980f45",
    "5f59e688f158c91676980f43",
    "5f59e826f158c91676980f44",
  ];

  constructor() {}

  static async generateList(criteriaList) {
    const list = {};
    this.storeIds.forEach((id) => {
      list[id] = [];
    });

    criteriaList.forEach((c) => {
      this.storeIds.forEach(async (id) => {
        let query = this.#queryBuilder({ ...c, storeId: id });
        let products = await ProductService.findProductsByQuery(query);
        products = this.#weightProducts(products, c.name);
        list[id].push(products[0]);
        console.log(list);
        list[id].push(products[1]);
      });
    });
    return list;
  }

  static #weightProducts(products, weight) {
    let weightProducts = [];
    products.forEach((p) => {
      let weightProduct = this.#weightProduct(p, weight);
      weightProducts.push(weightProduct);
    });
    weightProducts.sort((a, b) => b.weight - a.weight);
    return weightProducts;
  }

  static #weightProduct(product, weight) {
    let weightProduct = { ...product, weight: 0 };
    if (product.name === weight) {
      weightProduct.weight += 3;
    }
    if (product.name.includes(weight)) {
      weightProduct.weight += 1;
    }
    product.labels.forEach((l) => {
      if (l === weight) {
        weightProduct.weight += 1;
      }
      if (l.includes(weight)) {
        weightProduct.weight += 0.1;
      }
    });
    return weightProduct;
  }

  static #queryBuilder(query) {
    let keys = Object.keys(query);
    let builtQuery = {};
    for (let key of keys) {
      if (key === "name") {
        builtQuery[key] = new RegExp(query[key], "i");
      } else {
        builtQuery[key] = query[key];
      }
    }
    return builtQuery;
  }
};
