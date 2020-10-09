const Server = require("./Server");
const HarvesterScheduler = require("./HarvestScheduler");
const coopH = require('./Harvesters/CoopHarvester');
const coopS = require('./Scrubbers/CoopScrubber');

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
    // this.harvesterScheduler.run();
    let x = await coopH.getAllProducts();
    // console.log(x);
    let y = await coopS.scrubAll(x);
    y.forEach((x) => {
      if(x.name === "Smältost Cheddar Skivad"){console.log(x);}
    } )
    console.log("done")
  }
}

new App();
