var express = require('express');
var router = express.Router();

const auth = require("../middlewares/auth");
const dashboard_controller = require('../controllers/dashboardController');

/* GET dashboard layout page. */
router.get('/', auth, dashboard_controller.dashboard_index);

/* GET dashboard profile page. */
// router.get('/', auth, dashboard_controller.dashboard_profile);

/* GET dashboard wishlist page. */
// router.get('/', auth, dashboard_controller.dashboard_wishlist);

/* GET dashboard assets page. */
// router.get('/', auth, dashboard_controller.dashboard_assets);

/* GET dashboard marketplace page. */
// router.get('/', auth, dashboard_controller.dashboard_marketplace);

/* GET dashboard transaction history page. */
// router.get('/', auth, dashboard_controller.dashboard_transactions);

router.post('/dashboard-wishlist/search', auth, dashboard_controller.dashboard_wishlist_search);

router.delete('/dashboard-wishlist/delete', auth, dashboard_controller.dashboard_wishlist_remove);

module.exports = router;
