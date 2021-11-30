const { Router } = require('express');

const user = require('./user');
const post = require('./post');
const comment = require('./comment');

const router = Router();

router.use('/users', user);
router.use('/posts', post);
router.use('/comments', comment);

module.exports = router;