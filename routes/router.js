const router = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');
const commentsRouter = require('./commentsRouter');
const usersRouter = require('./usersRouter');

router.use('/topics', topicsRouter);
router.use('/articles', articlesRouter);
router.use('/comments', commentsRouter);
router.use('/users', usersRouter);
router.route('/')
	.get((req, res) => res.status(200).sendFile('index.html', {root: '.'}))
router.use('/*', (req, res, next) => {
	const err = new Error('Page not found! Invalid Path!');
	err.status = 404;
	res.status(err.status).json({ error: { status: err.status, message: err.message } });
	next();
});

module.exports = router;
