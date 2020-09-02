const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

module.exports = class CoopHarvester {
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
          url: $(x).parent().attr("data-code"),
          level: $(x).parents("ul").length,
        });
      });
    let filteredCategories = categories.filter((x) => x.level === 1);
    return filteredCategories.map((category) => delete category.level);
  }

  static async getProducts(categoryURL) {
    let raw = await fetch(
      "https://www.willys.se/c/" +
        categoryURL +
        this.bustCache() +
        "&size=10000"
    );
    return (await raw.json()).results;
  }

  static async getAllProducts() {
    let categories = await this.getCategories();
    // now loop basic categories and getProducts for each category...
    // how would you write this?
  }
};
