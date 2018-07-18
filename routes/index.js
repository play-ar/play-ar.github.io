var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ArWeb' });
});

router.get('/scanner', function(req, res, next) {
  res.render('scanner', { layout: false });
});

module.exports = router;
