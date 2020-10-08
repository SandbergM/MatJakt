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
    const productName = product.name.toLowerCase().replace(/[,.']/g, "").split(" ");
    if (productName.includes(weight)) {
      product.weight += 5;
    }
    productName.forEach(p => {
      if(p.includes(weight)) {
        product.weight += 1;
      }
    })
    product.categoryIds.includes(20)
    product.labels.forEach((l) => {
      if (l === weight) {
        product.weight += 1;
      }
    });

    product.weight -= this.#getCategoryWeight(product.categoryIds);
    
    return product;
  }

  static #queryBuilder(query) {
    const builtQuery = {
      storeId: query.storeId
    };
    if (query.name) {
      builtQuery.name = new RegExp(query.name, "i");
    }
    if (query.hasOwnProperty("categoryId") && query.categoryId !== -1) {
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
    ids.forEach((id) => {
      if (id === 2 || id === 4 || id === 7) {
        value += 1 * id;
      } else if (id === 0 || id === 1 || id === 6 || id === 5) {
        value += 10 * id;
      } else if (id === 3 || id === 8 || id === 9 || id === 10) {
        value += 25 * id;
      } else {
        value += 200 * id;
      }
    });
    return value === 0 ? 1000 : value;
  }
};
