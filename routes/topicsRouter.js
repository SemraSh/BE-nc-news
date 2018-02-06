const router = require('express').Router();
const {getAllTopics} = require('../controllers/topics');
const {getArticlesByTopic, addNewArticle} = require('../controllers/articles')

router.get('/', getAllTopics);
router.get('/:topic/articles', getArticlesByTopic);
router.post('/:topic/articles', addNewArticle);

module.exports = router;