const router = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');

router.use('/topics', topicsRouter);
router.use('/articles', articlesRouter);

module.exports = router;