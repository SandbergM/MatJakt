const Translations = require("../models/translation");

module.exports = class Translator {
  static translations = new Map();

  static async fetchTranslations() {
    let data = await Translations.find();

    try {
      data.forEach((x) => {
        this.translations.set(x._id, {
          category: x.categoryTranslation,
          label: x.label,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
};
