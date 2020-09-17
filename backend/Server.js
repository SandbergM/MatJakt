const express = require("express");
const mongoose = require("mongoose");
const app = express();

module.exports = class Server {
  dbURI =
    "mongodb+srv://matjakt:FoodHunt123@mat-jakt.mpf5m.mongodb.net/mat-jakt?retryWrites=true&w=majority";
  constructor () {}
  
  // Connects to db and starts express server
  async run() {
    await this.connectToDb();
    this.startServer();
  }

  connectToDb() {
    return mongoose.connect(this.dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  startServer() {
    app.listen(3000, () => {
      console.log("Listening at port 3000...");
    })
  }
};
