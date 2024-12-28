const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

router.post('/', postsController.post);
router.get('/', postsController.get);
router.get('/:id', postsController.getById);
router.delete('/:id', postsController.remove);

module.exports = router;
