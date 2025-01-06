const express = require('express');
const { verifyToken } = require('../config/authentication');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/kudos', require('./kudos'));
router.use('/postkudo',verifyToken, require('./poskudo'));

module.exports = router;
