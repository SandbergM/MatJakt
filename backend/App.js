const Server = require("./Server");
const HarvesterScheduler = require("./HarvestScheduler");
const iH = require("./Harvesters/IcaHarvester");
const iS = require("./Scrubbers/IcaScrubber");
const fs = require("fs");
const Translator = require("./Shared/Translator");

class App {
  constructor() {
    this.server = new Server();
    this.harvesterScheduler = new HarvesterScheduler();
    this.run();
  }

  async run() {
    console.log("Running server...");
    await this.server.run();
    console.log("Running harvester...");
    this.harvesterScheduler.run();
    let x = await iH.getAllProducts();
    let y = await iS.scrubAll(x);
    fs.writeFileSync("test.json", JSON.stringify(y, null, "  "), "utf-8");
  }
}

new App();
