const router = require('express').Router();
const {getAllArticles, getArticleById, updateVotes} = require('../controllers/articles.js')

router.get('/', getAllArticles)
router.get('/:article_id', getArticleById)
router.route('/:article_id?')
 .put( updateVotes )

module.exports = router;
