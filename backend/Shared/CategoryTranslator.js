const CategoryTranslation = require("../models/categoryTranslation");

module.exports = class Translator {
  static categories = new Map();

  static async fetchCategories() {
    let data = await CategoryTranslation.find();

    try {
      data.forEach((x) => {
        if (x.categoryTranslation) {
          this.categories.set(x._id, x.categoryTranslation);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};
