var fs = require("fs");
var classes = {};
var files = fs.readdirSync('./game_data/classes');

for(var i in files) {
  var file = files[i];
  console.log("file", file);
  classes[file.substr(0,file.length-3)] = require('./classes/' + file);
}

module.exports = classes;
