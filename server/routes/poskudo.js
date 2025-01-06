const express = require('express');
const router = express.Router();
const {create, getAll, getKudosCountPerKudo, getKudosCountPerUser, getMostLikedPost} = require('../controller/postKudo_controller');
const {toggleLike, getLike} = require('../controller/like_controller')


router.post('/create', create);
router.get('/getallkudos', getAll);
router.put('/toggleLike/:postId', toggleLike);
router.get('/kudocount', getKudosCountPerKudo);
router.get('/usercount', getKudosCountPerUser);
router.get('/mostLiked', getMostLikedPost);
router.get('/likes', getLike)


module.exports = router;
