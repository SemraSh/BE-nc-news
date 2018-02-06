const router = require('express').Router();
const { addNewComment } = require('../controllers/comments')

router.get('/comments/')