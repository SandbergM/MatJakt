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
    for (let c of criteriaList) {
      for (let id of this.storeIds) {
        let query = this.#queryBuilder({ ...c, storeId: id });
        let products = await ProductService.findProductsByQuery(query);
        products = this.#weightProducts(products, c.name);
        list[id].push(this.#getCheapestProduct(products));
      }
    }
    return list;
  }

  static #weightProducts(products, weight) {
    let weightProducts = [];
    products.forEach((p) => {
      let weightProduct = this.#weightProduct(p, weight.toLowerCase());
      weightProducts.push(weightProduct);
    });
    weightProducts.sort((a, b) => b.weight - a.weight);
    return weightProducts;
  }

  static #weightProduct(product, weight) {
    let weightProduct = { ...product, weight: 0 };
    const productName = product.name.toLowerCase().replace(/[,.']/g, "").split(" ");
    if (productName.includes(weight)) {
      weightProduct.weight += 5;
    }
    productName.forEach(p => {
      if(p.includes(weight)) {
        weightProduct.weight += 1;
      }
    })
    product.labels.forEach((l) => {
      if (l.toLowerCase() === weight) {
        weightProduct.weight += 1;
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

  static #getCheapestProduct(products) {
    const filteredProducts = products.filter(
      (p) => p.weight === products[0].weight
    );
    const cheapestProducts = filteredProducts.sort(
      (a, b) => a.pricePerUnit - b.pricePerUnit
    );
    // console.log(cheapestProducts);
    return cheapestProducts[0];
  }
};
