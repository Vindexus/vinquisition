var fs = require("fs");
var items = {};
var files = fs.readdirSync('./game_data/items');

for(var i in files) {
  var file = files[i];
  items[file.substr(0,file.length-3)] = require('./items/' + file);
}

module.exports = items;
