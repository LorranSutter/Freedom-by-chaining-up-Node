exports.dashboard_index = (req, res, next) => {
    res.render('dashboard', { title: 'Dashboard' });
}

exports.dashboard_profile =(req, res, next) => {
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
