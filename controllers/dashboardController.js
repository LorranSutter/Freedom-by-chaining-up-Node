let User = require('../models/User');
let Asset = require('../models/Asset');
let Transaction = require('../models/Transaction');
let MarketItem = require('../models/MarketItem');

let async = require('async');
let mongoose = require('mongoose');

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
        // console.log(results);
        // console.log(results.user.wishlist[0]._id.toString());

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

exports.dashboard_wishlist_search = (req, res, next) => {
    try {
        Asset.find({'name' : req.body.search })
             .then(x => {
                 res.send(x[0]);
             })
    } catch (error) {
        next(error);
    }
}

exports.dashboard_wishlist_remove = (req, res, next) => {
    // console.log(req);
    // try {
    //     User.update(
    //         { '_id' : req.session.user.id},
    //         { $pullAll: { 'wishlist': req.body._id } }
    //         );
        // User.findById(req.session.user.id,
        //     function(error, doc) {
        //         doc.wishlist.pull({_id : req.body._id});
        //         console.log('Error: ' + error);
        //         console.log(JSON.stringify(doc));
        //         // process.exit(0);
        //     });
        // User.findById(req.session.user.id,
        //     { $pull: { 'wishlist': { '_id': mongoose.ObjectId(req.body._id) }}},
        //     { safe: true, multi:true },
        //     function(error, doc) {
        //         console.log('Error: ' + error);
        //         console.log(JSON.stringify(doc));
        //         // process.exit(0);
        //     });
        // mongoIO.deleteItem({ _id: mongoDB.ObjectID(req.body._id), title: req.body.title });
        // res.send({ _id: mongoDB.ObjectID(req.body._id) });
    // } catch (error) {
    //     next(error);
    // }
    // res.render('dashboard/dashboard-wishlist', { title: 'Dashboard Wishlist' });
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
