const Server = require("./Server");

class App {

  constructor(){
    // Start the web server
    new Server();
    // Start the harvester scheduler
    // write a HarvesterWatcher that checks time of last harvest
    // (we need to save in the db)
    // it might check once a minute and if now - last time > 24 hours
    // start a new harvest
    // do not start if harvestInProgrsss = true
    new HarvesterScheduler();
  }
}

new App();
