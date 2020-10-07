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
    product.weight = 0;
    const productName = product.name
      .toLowerCase()
      .replace(/[,.']/g, "")
      .split(" ");
    if (productName.includes(weight)) {
      product.weight += 5;
    }
    productName.forEach((p) => {
      if (p.includes(weight)) {
        product.weight += 1;
      }
    });
    product.labels.forEach((l) => {
      if (l.toLowerCase() === weight) {
        product.weight += 1;
      }
    });

    product.weight -= this.#getCategoryWeight(product.categoryIds);

    return product;
  }

  static #queryBuilder(query) {
    const builtQuery = {
      storeId: query.storeId,
    };
    if (query.name) {
      builtQuery.name = new RegExp(query.name, "i");
    }
    if (query.categoryId !== null) {
      builtQuery.categoryIds = query.categoryId;
    }
    if (query.isEcological) {
      builtQuery.isEcological = query.isEcological;
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
    return cheapestProducts[0];
  }

  static #getCategoryWeight(ids) {
    let value = 0;
    ids.forEach((id) => (value += parseInt(id)));
    return value;
  }
};
