let User = require('../models/User');
let Asset = require('../models/Asset');
let Transaction = require('../models/Transaction');
let MarketItem = require('../models/MarketItem');

let async = require('async');

exports.dashboard_index = (req, res) => {

    async.parallel({
        user: function(cb) {
            User.findById(req.session.user.id, 'username balance assets')
                .lean()
                .populate({path: 'wishlist', select: 'name'})
                .populate({path: 'assets.asset'})
                .exec(cb);
        },
        transactions: function(cb) {
            Transaction.find({ $or: [
                                    {'seller' : req.session.user.id},
                                    {'buyer' : req.session.user.id}
                                ]
                            })
                       .lean()
                       .populate({ path: 'buyer', select: 'username'})
                       .populate({ path: 'seller', select: 'username' })
                       .populate({ path: 'asset.asset' })
                       .sort([['createdAt', 'descending']])
                       .exec(cb);
        },
        marketplace: function(cb) {
            MarketItem.find()
                      .lean()
                      .populate({ path: 'seller', select: 'username' })
                      .populate({ path: 'asset.asset'})
                      .sort([['createdAt', 'descending']])
                      .exec(cb);
        }
    }, function(err, results) {
        if (err) { console.log(err); }
        console.log(results);
        console.log(results.user.wishlist[0]._id.toString());

        res.render('dashboard', { 
            title: 'Dashboard',
            username: results.user.username,
            balance: results.user.balance,
            assets_list: results.user.assets,
            wishlist: results.user.wishlist,
            transactions_list: results.transactions,
            marketItens: results.marketplace
        }); 
    });
}

exports.dashboard_profile = (req, res, next) => {
    res.render('dashboard/dashboard-profile', { title: 'Dashboard Profile' });
}

exports.dashboard_wishlist = (req, res, next) => {
    res.render('dashboard/dashboard-wishlist', { title: 'Dashboard Wishlist' });
}

exports.dashboard_wishlist_remove = (req, res, next) => {
    res.render('dashboard/dashboard-wishlist', { title: 'Dashboard Wishlist' });
}

exports.dashboard_assets = (req, res, next) => {
    res.render('dashboard/dashboard-assets', { title: 'Dashboard Assets' });
}

exports.dashboard_marketplace = (req, res, next) => {
    res.render('dashboard/dashboard-marketplace', { title: 'Dashboard Marketplace' });
}

exports.dashboard_transactions = (req, res, next) => {
    res.render('dashboard/dashboard-transactions', { title: 'Dashboard Transaction History' });
}
