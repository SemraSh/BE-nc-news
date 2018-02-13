const router = require('express').Router();
const { getAllComments, getCommentById, voteComment, deleteComment } = require('../controllers/comments.js');

router.get('/', getAllComments);
router.get('/:comment_id', getCommentById);
router.put('/:comment_id', voteComment);
router.delete('/:comment_id', deleteComment);

module.exports = router;