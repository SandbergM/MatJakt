const express = require("express");
const mongoose = require("mongoose");
const app = express();

module.exports = class Server {
  dbURI =
    "mongodb+srv://matjakt:FoodHunt123@mat-jakt.mpf5m.mongodb.net/mat-jakt?retryWrites=true&w=majority";
  constructor () {
    this.run();
  }
  
  // Connects to db and starts express server
  async run() {
    await this.connectToDb();
    console.log("Connected to db...")
    this.startServer();
  }

  async connectToDb() {
    console.log("Connecting to db...");
    await mongoose.connect(this.dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  startServer() {
    console.log("Starting server...");
    app.listen(3000, () => {
      console.log("Listening at port 3000...");
    })
  }
};
