var express = require('express');
var router = express.Router();

/* GET howItWorks page. */
router.get('/', function(req, res, next) {
  res.render('howItWorks', { title: 'How It Works' });
});

module.exports = router;
