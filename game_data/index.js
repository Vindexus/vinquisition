var game_data = {};
var fs = require("fs");

game_data.tags = require('./tags');

game_data.skills = require('./external_skills');

var folders = ['classes', 'skills', 'items'];
for(var i in folders) {
  var folder = folders[i];
  var objects = {};
  var files = fs.readdirSync('./game_data/' + folder);

  if(!game_data.hasOwnProperty(folder)) {
    game_data[folder] = {};  
  }

  for(var i in files) {
    var file = files[i];
    var key = file.substr(0,file.length-3);
    game_data[folder][key] = require('./' + folder + '/' + file);

    if(!game_data[folder][key].hasOwnProperty("key")) {
      game_data[folder][key].key = key;
    }
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


for(var key in game_data.skills) {
  game_data.skills[key].key = key;

  if(!game_data.skills[key].hasOwnProperty("name")) {
    var parts = key.split("_").map(function (value) {
      return capitalizeFirstLetter(value);
    });

    game_data.skills[key].name = parts.join(" ");
  }
}

module.exports = game_data;
