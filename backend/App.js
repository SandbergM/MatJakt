const Server = require("./Server");
const HarvesterScheduler = require("./HarvestScheduler");
const t = require("./Shared/Translator");
let wH = require("./Harvesters/WillyHarvester");
let wS = require("./Scrubbers/WillysScrubber");

class App {
  constructor() {
    this.server = new Server();
    // this.harvesterScheduler = new HarvesterScheduler();
    this.run();
  }

  async run() {
    console.log("Running server...");
    await this.server.run();
    console.log("Running harvester...");
    // this.harvesterScheduler.run();
    await t.fetchTranslations();
    let x = await wH.getAllProducts();
    let y = await wS.scrubAll(x);
    console.log(y);
  }
}

new App();
