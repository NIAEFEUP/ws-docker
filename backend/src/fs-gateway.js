const fs = require("fs");

class FileSystemItemGateway {
  constructor(pathToFile) {
    this.path = pathToFile;
  }

  getMap() {
    try {
      return JSON.parse(fs.readFileSync(this.path, { encoding: "utf-8" }));
    } catch (e) {
      console.error(e);
      return {};
    }
  }

  saveMap(itemMap) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(itemMap, undefined, 2));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

module.exports = FileSystemItemGateway;
