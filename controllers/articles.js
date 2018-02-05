const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Articles } = require('../models/models')

const getAllArticles = (req, res) => {
  Articles.find()
    .then(articles => {
      res.status(200).json(articles)
    }).catch(console.error)
}

const getArticleById = (req, res) => {
  Articles.findById(req.params.article_id)
    .then(article => {
      res.status(200).json(article)
    }).catch(console.error)
}

const getArticlesByTopic = (req, res) => {
  Articles.find({ belongs_to: req.params.topic })
    .then(articles => {
      res.status(200).json(articles)
    }).catch(console.error)
}


const addNewArticle = (req, res) => {
  const { belongs_to, title, body, created_by } = req.body
  const article = new Articles({
    belongs_to,
    title,
    body,
    created_by
  });
  article.save()
    .then(article => res.status(201).json(article))
    .catch(console.error)
}

const updateVotes = (req, res) => {
  let vote = 0;
  if (req.query.vote === 'up') vote++
  else if (req.query.vote === 'down') vote--

  Articles.findByIdAndUpdate({ _id: req.params.article_id }, { $inc: { votes: vote } }).lean()
    .then(article => {
      console.log(article)
      article.votes += vote
      res.json(article)
    }).catch(console.error)
}


module.exports = { getAllArticles, getArticleById, getArticlesByTopic, addNewArticle, updateVotes }