const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

module.exports = class CoopHarvester {
  static coopApiBaseUrl =
    "https://www.coop.se/ws/v2/coop/users/anonymous/" +
    "products/discover?categoryId=XXX&storeId=016001" +
    "&placements=category_page.Discover&rrSessionId=1" +
    "&currentPage=0&pageSize=10000&fields=FULL";

  static async getCategories() {
    let raw = await fetch("https://www.coop.se/handla/");
    //in this case we use cheerio to get categories from hardcoded html data
    let html = await raw.text();
    let $ = cheerio.load(html);
    let categories = [];
    $(".nav-container > ul")
      .last()
      .find(".nav-node-name")
      .each((i, x) => {
        categories.push({
          name: entities.decode($(x).html()),
          code: $(x).parent().attr("data-code"),
          level: $(x).parents("ul").length,
        });
      });
    let filteredCategories = categories.filter((x) => x.level === 1);

    return filteredCategories.map((x) => {
      delete x.level;
      return x;
    });
  }

  static async getProducts(categoryCode) {
    let raw = await fetch(this.coopApiBaseUrl.replace(/XXX/, categoryCode));
    return (await raw.json()).products;
  }

  static async getAllProducts() {
    const products = [];
    let categories = await this.getCategories();
    for (let category of categories) {
      let categoryProducts = await this.getProducts(category.code);
      products.push(...categoryProducts);
    }
    return products;
  }
};
