const fetch = require("node-fetch");

let categories = new Map();

module.exports = class Translator {
  static async fetchCategories() {
    let data = fetch(`http://localhost:3000/categoryTranslations`);
    try {
      let dataJson = await (await data).json();
      Object.entries(dataJson).map((obj) => {
        categories.set(obj[1]["_id"], obj[1]["categoryTranslation"]);
      });
    } catch (e) {
      console.log(e);
    }
  }
  static categories() {
    return categories;
  }
};
