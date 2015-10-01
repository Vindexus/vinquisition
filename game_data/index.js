var game_data = {};

game_data.classes = require('./classes');
game_data.skills = require('./skills');
game_data.items = require('./items');
game_data.tags = require('./tags');

console.log(game_data.tags);

module.exports = game_data;
