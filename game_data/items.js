var fs = require("fs");
var items = {};
var files = fs.readdirSync('./game_data/items');

for(var i in files) {
  var file = files[i];
  console.log("file", file);
  items[file.substr(0,file.length-3)] = require('./items/' + file);
}

for(var i in items) {
  var item = items[i];
  items[i].tags.push(item.weight + " weight");
  items[i].tags.push(item.thrones + " thrones");
}

module.exports = items;
