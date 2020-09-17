const fetch = require("node-fetch");
const CategoryTranslation = require("../models/categoryTranslation");
let categories = new Map();

module.exports = class Translator {
  static async fetchCategories() {
    //let data = categorytranslationsRoute.get_all_translations(); // fetch(`http://localhost:3000/categoryTranslations`);
    let data = await CategoryTranslation.find();
    try {
      Object.entries(data).map((obj) => {
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
