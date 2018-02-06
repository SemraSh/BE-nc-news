const router = require('express').Router();
const {getAllUsers, getUserByUsername} = require('../controllers/users')

router.get('/', getAllUsers);
router.get('/:username', getUserByUsername);

module.exports = router;