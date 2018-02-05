const router = require('express').Router();
const {getAllArticles, getArticleById} = require('../controllers/articles.js')

router.get('/', getAllArticles)
router.get('/:article_id', getArticleById)



module.exports = router;
