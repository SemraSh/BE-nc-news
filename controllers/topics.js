const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Topics, Articles } = require('../models/models.js');

const getAllTopics = (req, res, next) => {
	Topics.find()
		.then(topics => res.status(200).json(topics))
		.catch(next)
};

const getArticlesByTopic = (req, res, next) => {
		Articles.find({ belongs_to: req.params.topic })
			.then(articles => {
				if( !articles.length ) {
					const err = new Error("This topic doesn't exist")
					err.status = 400
					next(err)
				} else res.status(200).json(articles);
			}).catch(next);
};



module.exports = { getAllTopics, getArticlesByTopic };