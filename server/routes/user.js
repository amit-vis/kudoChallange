const express = require('express');
const router = express.Router();
const {create, signin, getAll, login} = require('../controller/user_controller');
const { verifyToken } = require('../config/authentication');

router.post('/create', create);
router.post('/signin', signin);
router.get('/getUsers', verifyToken, getAll);
router.post('/login', verifyToken, login);


module.exports = router;
