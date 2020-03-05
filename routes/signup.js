const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();

const user_controller = require('../controllers/userController');

/* GET signup page. */
router.get('/', user_controller.signup_index);

router.post(
    "/auth",
    check('email').isEmail(),
    user_controller.signup_auth
);

module.exports = router;
