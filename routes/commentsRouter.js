const router = require('express').Router();
const { voteComment, deleteComment } = require('../controllers/comments.js')

router.put('/:comment_id', voteComment)
router.delete('/:comment_id', deleteComment)

module.exports = router;