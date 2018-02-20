const router = require('express').Router();
const { getAllArticles, getArticleById, updateVotes, addNewComment  } = require('../controllers/articles.js');
const { getCommentsByArticle} = require('../controllers/comments');

router.get( '/', getAllArticles );
router.get( '/:article_id', getArticleById );
router.get( '/:article_id/comments', getCommentsByArticle );
router.post( '/:article_id/comments', addNewComment );
router.put( '/:article_id', updateVotes );

module.exports = router;
