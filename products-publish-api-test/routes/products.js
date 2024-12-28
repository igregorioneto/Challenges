const router = require('express').Router();
const controller = require('../controllers/products');

router.get('/', controller.get)
router.post('/', controller.post)
router.patch('/:id', controller.patch)
router.delete('/:id', controller.remove)


module.exports = router;
