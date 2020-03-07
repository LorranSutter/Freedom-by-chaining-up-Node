let User = require('../models/User');
let Asset = require('../models/Asset');
let Transaction = require('../models/Transaction');
let MarketItem = require('../models/MarketItem');

let async = require('async');
let mongoose = require('mongoose');

// exports.dashboard_index = (req, res, next) => {
//     User.findById(req.session.user.id, 'username balance assets wishlist')
//         .populate('assets')
//         .then(user => {
//             console.log('Here1');
//             console.log(user.username);

//             // Asset.findById(user.assets[0].asset._id)
//             //      .then(asset => {
//             //         res.render('dashboard/dashboard-profile', { 
//             //             title: 'Dashboard Profile',
//             //             item: asset.name
//             //         });
//             //          console.log(asset);
//             //      })
//             //      .catch((err) => {
//             //         console.log(err);
//             //     });
//             console.log(user.assets[0]);
//             // console.log(user.assets[0]._id);
//             res.render('dashboard', { 
//                 title: 'Dashboard',
//                 username: user.username,
//                 balance: user.balance,
//                 assets_list: user.assets
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

exports.dashboard_index = (req, res) => {

    async.parallel({
        user: function(cb) {
            User.findById(req.session.user.id, 'username balance assets')
                .lean()
                .populate({path: 'wishlist', select: 'name'})
                .populate({path: 'assets.asset'})
                .exec(cb);
        },
        // assets: function(cb) {
        //     User.findById(req.session.user.id, 'assets')
        //         .lean()
        //         .then(u => {
        //             let assetsIds = [];
        //             for (const elem of u.assets) {
        //                 assetsIds.push(elem.asset._id);
        //             }
        //             Asset.find({ '_id': { $in: assetsIds } }, 'name')
        //                  .exec(cb);
        //         });
        // },
        transactions: function(cb) {
            // Transaction.find({ $or: [
            //                             {'seller' : req.session.user.id},
            //                             {'buyer' : req.session.user.id}
            //                         ]
            //                     })
            //             .populate('asset')
            //             .then(transaction => {
            //                 let assetsIds = transaction;
            //                 for (const elem of transaction) {
            //                     assetsIds.push(elem._id);
            //                 }
            //                 // Asset.find({'_id': {$in: transaction}})
            //             })
            //             .exec(cb);
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
        // transactions2: function(cb) {
        //     Transaction.find({ $or: [
        //                             {'seller' : req.session.user.id},
        //                             {'buyer' : req.session.user.id}
        //                         ]
        //                     })
        //                 .populate('asset')
        //                 // .lean()
        //                 // .sort([['createdAt', 'descending']])
        //                 .exec(cb);
    }, function(err, results) {
        if (err) { console.log(err); }
        console.log(results);

        // let assets_list = [];
        // for (let i = 0; i < results.assets.length; i++) {
        //     assets_list.push({
        //         asset: results.assets[i],
        //         amount: results.user.assets[i].amount
        //     });
        // }

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


// exports.dashboard_index = (req, res) => {

//     let user, assetsList;
    
//     User.findById(req.session.user.id)
//         .populate('asset')
//         .then(u => user = u);

//     for (let asset of user.assets) {
//         Asset.findById(asset.asset._id)
//                 .then(a => assetsList.push(a) );
//         }
    
//     console.log(user);
//     console.log(assetsList);
//     res.render('dashboard', { 
//         title: 'Dashboard',
//         username: result1.username,
//         balance: result1.balance
//     });
// }


// exports.dashboard_index = (req, res) => {

//     async.waterfall([
//         function(next) {
//             User.findById(req.session.user.id)
//                 .populate('asset')
//                 .exec(next);
//         },
//         function(user, next) {
//             let assetsList = []
//             for (let asset of user.assets) {
//                 Asset.findById(asset.asset._id)
//                      .exec(a => {
//                          assetsList.push(a);
//                         });
//             }
//             next(null, user, assetsList)
//         }
//     ], function(err, result1, result2) {
//         if (err) { console.log(err); }
//         console.log(result1);
//         console.log(result2);
//         res.render('dashboard', { 
//             title: 'Dashboard',
//             username: result1.username,
//             balance: result1.balance
//         }); 
//     });
// }

// exports.dashboard_index = (req, res, next) => {
//     User.findById(req.session.user.id, 'username balance assets wishlist')
//         .lean()    
//         .populate('asset')
//         .then((user) => {
//             console.log('Here1');
//             console.log(user.username);

//             Asset.findById(user.assets[0].asset._id)
//                  .then(asset => {
//                     res.render('dashboard/dashboard-profile', { 
//                         title: 'Dashboard Profile',
//                         item: asset.name
//                     });
//                      console.log(asset);
//                  })
//                  .catch((err) => {
//                     console.log(err);
//                 });;
//             console.log(user.assets[0]);
//             console.log(user.assets[0]._id);
//             res.render('dashboard', { 
//                 title: 'Dashboard',
//                 username: user.username,
//                 balance: user.balance
//                 // assets_list: user.assets
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

exports.dashboard_profile = (req, res, next) => {
    res.render('dashboard/dashboard-profile', { title: 'Dashboard Profile' });
}

exports.dashboard_wishlist = (req, res, next) => {
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
