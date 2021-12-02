const { Router } = require('express');

const controller = require('./controller');
const {auth} = require('../../middleware/auth');

const router = Router();

router.post('/post', auth, controller.uploadPost);
router.post('/image', controller.uploadImage);

router.get('/posts', controller.getPostList);
router.get('/post/:postId', controller.getOnePost);

module.exports = router;