const HarvestingMetaData = require("./models/HarvestingMetaData");
const Harvester = require("./Harvesters/Harvester");

module.exports = class HarvestScheduler {
  harvesterMetaData;

  constructor() { }

  run() {
    this.harvester = new Harvester();
    setInterval(async () => {
      if (await this.timeToHarvest()) {
        this.harvest();
      }
    }, 60000);
  }

  async timeToHarvest() {
    await this.fetchHarvestMetaData();
    return (
      this.harvestIsOverdue(this.harvesterMetaData.lastHarvestTime) &&
      !this.harvesterMetaData.harvesterIsRunning
    );
  }

  async fetchHarvestMetaData() {
    this.harvesterMetaData = await HarvestingMetaData.findOne(
      { _id: 1 },
      (err) => { if (err) { console.log(`Error ${err}`); } }
    );
  }

  harvestIsOverdue(lastHarvest) {
    return Date.now() - lastHarvest > 1000 * 60 * 60 * 24;
  }

  async harvest() {
    let updatedMetaData = this.harvesterMetaData;
    updatedMetaData.harvesterIsRunning = true;
    await HarvestingMetaData.findOneAndUpdate({ _id: 1 }, updatedMetaData, {
      upsert: true,
    });
    try {
      await this.harvester.run();
      updatedMetaData.lastHarvestTime = Date.now();
    } catch (error) {
      console.log(error);
    }
    updatedMetaData.harvesterIsRunning = false;
    await HarvestingMetaData.findOneAndUpdate({ _id: 1 }, updatedMetaData, {
      upsert: true,
    });
  }
};
