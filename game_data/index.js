var game_data = {};
var fs = require("fs");

game_data.tags = require('./tags');

var folders = ['classes', 'skills', 'items'];
for(var i in folders) {
  var folder = folders[i];
  var objects = {};
  var files = fs.readdirSync('./game_data/' + folder);
  game_data[folder] = {};  

  for(var i in files) {
    var file = files[i];
    var key = file.substr(0,file.length-3);
    game_data[folder][key] = require('./' + folder + '/' + file);
    game_data[folder][key].key = key;
  }
}

game_data.skills.discern_realities = {
  name: 'Discern Realities',
  key: 'discern_realities',
  external_link: 'http://www.dungeonworldsrd.com/moves#TOC-Discern-Realities'
};

game_data.skills.hack_and_slash = {
  name: 'Hack and Slash',
  key: 'hack_and_slash',
  external_link: 'http://www.dungeonworldsrd.com/moves#TOC-Hack-and-Slash'
};

game_data.skills.volley = {
  name: 'Volley',
  key: 'volley',
  external_link: 'http://www.dungeonworldsrd.com/moves#TOC-Volley'
};

module.exports = game_data;
