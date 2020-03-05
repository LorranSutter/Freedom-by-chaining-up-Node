const express = require('express');
const router = express.Router();

const auth = require("../middlewares/auth");
const user_controller = require('../controllers/userController');

/* GET login page. */
router.get('/', user_controller.login_index);

router.post("/auth", user_controller.login_auth);

// route for user logout
router.get('/logout', auth, user_controller.logout);

module.exports = router;
