var fs = require("fs");
var skills = {};
var files = fs.readdirSync('./game_data/skills');

for(var i in files) {
  var file = files[i];
  console.log("file", file);
  skills[file.substr(0,file.length-3)] = require('./skills/' + file);
}

module.exports = skills;
