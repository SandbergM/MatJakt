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
      if(p.includes(weight)) {product.weight += 1;}
      if(p.toLowerCase() === weight){product.weight += 100}
    })
    product.labels.forEach((l) => {
      if (weight.includes(l)) { product.weight += 1; }
      if(weight === l){ product.weight += 100 }
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
    ids.forEach((id) => {
      id = parseInt(id)
      switch (id) {
        case 0: value -= 5;
          break;
        case 1: value += 50;
          break;
        case 2: value -= 100;
          break;
        case 3: value += 55;
          break;
        case 4: value -= 50;
          break;
        case 5: value += 25;
          break;
        case 6: value += 75;
          break;
        case 7: value -= 25;
          break;
        case 8: value += 100;
          break;
        case 9: value += 25;
          break;
        case 18: value += 1000;
          break;
        default: value += 0;
      }
    });
    return value === 0 ? 10000 : value;
  }
};
