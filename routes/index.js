var express = require('express');
var router = express.Router();
var app = express();
var game_data = require('../game_data/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Vinquisition'});
});

/* GET game object page. */
router.get('/view/:type/:key', function(req, res, next) {
  var obj = game_data[req.params][req.key];

  res.render('game_obj_page', {obj: obj, title: obj.name});
});


router.get('/class/:key', function(req, res, next) {
  var obj = game_data.classes[req.params.key];

  res.render('class_page', {obj: obj, title: obj.name});
});

router.get('/items', function(req, res, next) {
  res.render('items', {items: game_data.items, title: 'Items'});
});

router.get('/game_data.json', function(req, res, next) {
  var json = JSON.stringify(game_data);
  res.end(json);
});

router.get('/skills', function(req, res, next) {
  res.render('skills', {skills: game_data.skills, title: 'Skills'});
});


module.exports = router;
