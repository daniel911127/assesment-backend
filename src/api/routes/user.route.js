const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/logup').post(userController.signup);
router.route('/login').post(userController.signin);

module.exports = router;
