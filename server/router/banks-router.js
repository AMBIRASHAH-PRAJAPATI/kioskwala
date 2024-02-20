// bank-router.js
const express = require('express');
const bankControllers = require('../controllers/bank-controler');
const router = express.Router();

router.route('/govtbanks').get(bankControllers.govtBanks);
router.route('/pvtbanks').get(bankControllers.pvtBanks);

module.exports = router;

// const express = require('express');
// const banks = require('../controllers/bank-controler');
// const router = express.Router();

// router.route('/banks').get(banks);

// module.exports = router;

