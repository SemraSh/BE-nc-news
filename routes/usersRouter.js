const router = require('express').Router();
const {getAllUsers, getUserByUsername, getArticlesByUsername} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:username', getUserByUsername);
router.get('/:username/articles', getArticlesByUsername)

module.exports = router;