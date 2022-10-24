const router = require('express').Router();
const listController = require('../controllers/list.controller');

router.route('/').get(listController.list);
router.route('/:listId').get(listController.show);
router.route('/:userId').post(listController.create);
router.route('/:listId').put(listController.update);
router.route('/:listId').delete(listController.destroy);

module.exports = router;
