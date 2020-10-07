const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const Translator = require("./Shared/Translator");



module.exports = class Server {
  dbURI =
    "mongodb+srv://matjakt:FoodHunt123@mat-jakt.mpf5m.mongodb.net/mat-jakt?retryWrites=true&w=majority";
  constructor() { }

  // Connects to db and starts express server
  async run() {
    await this.connectToDb();
    this.startServer();
  }

  async connectToDb() {
    console.log("Connecting to db...");
    await mongoose.connect(this.dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to db...");
    await Translator.fetchTranslations();
  }

  startServer() {
    console.log("Starting server...");
    app.use(cors({ origin: "http://localhost:3001" }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(require("./Router"));
    app.listen(3000, () => {
      console.log("Listening at port 3000...");
    });
  }
};
