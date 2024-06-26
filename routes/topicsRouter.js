const router = require('express').Router();
const { getAllTopics, getArticlesByTopic, addNewArticle } = require('../controllers/topics');

router.get('/', getAllTopics);
router.get('/:topic/articles', getArticlesByTopic);
router.post('/:topic/articles', addNewArticle);



module.exports = router;