const express = require('express');
const router = express.Router();

const howItWorks_controller = require('../controllers/howItWorksController');

/* GET howItWorks page. */
router.get('/', howItWorks_controller.howItWorks_index);

module.exports = router;
