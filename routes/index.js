var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/auth', function(req, res, next) {
  res.send(req.session.user && req.cookies.user_sid ? true : false);
});

module.exports = router;
