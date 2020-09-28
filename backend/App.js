const Server = require("./Server");
const HarvesterScheduler = require("./HarvestScheduler");

class App {
  constructor() {
    this.server = new Server();
    // this.harvesterScheduler = new HarvesterScheduler();
    this.run();
  }

  async run() {
    // console.log("Running server...")
    await this.server.run();
    // console.log("Running harvester...")
    // this.harvesterScheduler.run();
  }
}

new App();
