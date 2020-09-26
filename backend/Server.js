const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./Router'));

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
  }

  startServer() {
    console.log("Starting server...");
    app.listen(3000, () => {
      console.log("Listening at port 3000...");
    });
  }
};
