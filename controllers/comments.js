const mongoose = require('mongoose')
const { Comments } = require('../models/models')
mongoose.Promise = Promise;

const getCommentsByArticle = (req, res) => {
  Comments.find({belongs_to: req.params.article_id})
  .then(comments => {
    res.status(200).json(comments)
  }).catch(console.error)
}

const addNewComment = (req, res) => {
  const { belongs_to, body } = req.body
  const comment = new Comments({
    body,
    belongs_to: req.params.article_id
  });
  comment.save()
    .then(comment => res.status(201).json(comment))
    .catch(console.error)
}



module.exports = {getCommentsByArticle, addNewComment};