const express = require('express');
const router = express.Router();
const {create, getAll} = require('../controller/kudos_controller');


router.post('/create', create);
router.get('/getallkudos', getAll)


module.exports = router;
