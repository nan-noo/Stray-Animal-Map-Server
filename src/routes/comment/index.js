const { Router } = require('express');

const controller = require('./controller');
const { auth } = require('../../middleware/auth');

const router = Router();

router.post('/comment', auth, controller.writeComment);

router.get('/allComments/:postId', controller.getCommentList);

module.exports = router;