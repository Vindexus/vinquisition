var fs = require("fs");
var jsdom = require("jsdom");

var factory = function(options) {
  var defaults = {
    gameDataDir: '/gameData', //Where the game data is located
    folders: [], //One file returning many objects
    simples: [] //One file returning many objects
  };
  var gameData = {};
  
  for(var key in defaults) {
    options[key] = options.hasOwnProperty(key) ? options[key] : defaults[key];
  }

  console.log(options);
    
  for(var i in options.simples) {
    var key =  options.simples[i];
    gameData[key] = require(options.gameDataDir + '\\' + key);
  }

  for(var i in options.folders) {
    var folder = options.folders[i];
    var objects = {};
    var files = fs.readdirSync(options.gameDataDir + '\\' + folder);

    if(!gameData.hasOwnProperty(folder)) {
      gameData[folder] = {};  
    }

    for(var i in files) {
      var file = files[i];
      var key = file.substr(0,file.length-3);
      gameData[folder][key] = require('./' + folder + '/' + file);

      if(!gameData[folder][key].hasOwnProperty("key")) {
        gameData[folder][key].key = key;
      }
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getTagObj(obj) {
    var path = obj.attr("path");
    return pathToObj(path);
  }

  function pathToObj(path) {
    console.log("before", path);
    path = path.replace(/(\[.*?\])/g, function(org, p1) {
      console.log("p1", p1);
      var datpath = p1.substr(1,p1.length-2);
      console.log("datpath", datpath);
      var r = pathToObj(datpath);
      console.log("r", r);
      return r;
    });
    console.log("after", path);
    var parts = path.split(".");
    var obj = gameData[parts[0]];
    var len = parts.length;

    for(var i = 1; i < len; i++) {
      if(!obj.hasOwnProperty(parts[i])) {
        return false;
      }

      obj = obj[parts[i]];
    }
    console.log("obj", obj);
    return obj;
  }

  for(var key in gameData.skills) {
    gameData.skills[key].key = key;

    if(!gameData.skills[key].hasOwnProperty("name")) {
      var parts = key.split("_").map(function (value) {
        return capitalizeFirstLetter(value);
      });

      gameData.skills[key].name = parts.join(" ");
    }
  }

  return {
    gameData: function () {
      return gameData;
    },
    parseHTML: function(html, opts, callback) {
      var defaults = {
        classToAIDStyle: false
      };

      for(var defaults in opts) {
        opts[key] = opts.hasOwnProperty(key) ? opts[key] : defaults[key];
      }

      jsdom.env(
        html,
        ["http://code.jquery.com/jquery.js"],
        function (err, window) {
          //console.log('window', window);
          console.log('----');
          console.log(window.document.documentElement.outerHTML);
          console.log('~~~~~~~~~~~~~~');

          var $ = window.$;

          $('if').each(function () {
            var $this = $(this);
            var obj = getTagObj($this);

            if(!obj) {
              $this.replaceWith('');
            }
            else {
              $this.replaceWith($this.html());
            }
          });

          var standardTags = ['name', 'description'];

          for(var i in standardTags) {
            var tag = standardTags[i];
            $(tag).each(function () {
              var $this = $(this);
              var gameObj = getTagObj($this);

              $this.replaceWith('<span class="' + tag + '">' + gameObj[tag] + '</span>');
            });

            $('[gamedata]').each(function () {
              var $this = $(this);
              var path = $this.attr('gamedata');
              $this.removeAttr("gamedata");
              $this.html(pathToObj(path));
            });
          }

          $('gamedata').each(function () {
            var $this = $(this);
            var gamedata = getTagObj($this);
            $this.replaceWith('<span>' + gamedata + '</span>');
          });


          var parsed = $('body').html();
          console.log('----');
          console.log('parsed', parsed);
          callback(parsed);
        }
      );
    }
  };
}

module.exports = factory;
