const express = require('express');
const router = express.Router();

const contact_controller = require('../controllers/contactController');

/* GET contact page. */
router.get('/', contact_controller.contact_index);

module.exports = router;
