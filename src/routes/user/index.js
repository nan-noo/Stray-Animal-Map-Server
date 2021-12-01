const { Router } = require('express');

const controller = require('./controller');
const router = Router();

const { auth } = require('../../middleware/auth');

router.post('/auth', auth, controller.auth);
router.post('/register', controller.register);
router.post('/login', controller.logIn);
router.post('/logOut', auth, controller.logOut);

module.exports = router;