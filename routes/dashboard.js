var express = require('express');
var router = express.Router();

const auth = require("../middlewares/auth");

/* GET dashboard layout page. */
router.get('/', function(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        res.render('dashboard', { title: 'Dashboard' });
    } else {
        res.redirect('/login');
    }
});

/* GET dashboard profile page. */
router.get('/', function(req, res, next) {
    res.render('dashboard/dashboard-profile', { title: 'Dashboard Profile' });
});

/* GET dashboard wishlist page. */
router.get('/', function(req, res, next) {
    res.render('dashboard/dashboard-wishlist', { title: 'Dashboard Wishlist' });
});

/* GET dashboard assets page. */
router.get('/', function(req, res, next) {
    res.render('dashboard/dashboard-assets', { title: 'Dashboard Assets' });
});

/* GET dashboard marketplace page. */
router.get('/', function(req, res, next) {
    res.render('dashboard/dashboard-marketplace', { title: 'Dashboard Marketplace' });
});

/* GET dashboard transaction history page. */
router.get('/', function(req, res, next) {
    res.render('dashboard/dashboard-transactions', { title: 'Dashboard Transaction History' });
});

module.exports = router;
