const router = require('express').Router();
const { getAllTopics, getArticlesByTopic } = require('../controllers/topics');
const { addNewArticle } = require('../controllers/articles');

router.get('/', getAllTopics);
router.get('/:topic/articles', getArticlesByTopic);
router.post('/:topic/articles', addNewArticle);



module.exports = router;