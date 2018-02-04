const mongoose = require('mongoose')
mongoose.Promise = Promise;
const { Topics, Articles } = require('../models/models.js')

const getAllTopics = (req, res) => {
  Topics.find()
    .then(topics => {
      res.status(200).json(topics)
    }).catch(console.error)
}

const getArticlesByTopic = (req, res) => {
  Articles.find({ belongs_to: req.params.topic })
    .then(articles => {
      res.status(200).json(articles)
    }).catch(console.error)
}

module.exports = { getAllTopics, getArticlesByTopic }