var recipes = require('../recipes.json');
var router = require('express').Router();

router.get('/', function(req, res, next) {
    const {page, limit = recipes.length} = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || pageNum < 1 || isNaN(limitNum) || limitNum < 1) {
        return res.status(400).json({ error: 'Invalid page or limit parameter' })
    }

    // paginação
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const result = recipes.slice(startIndex, endIndex);

    res.status(200).json(result);
});

module.exports = router;

