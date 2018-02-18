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
			if (!articles.length) {
				const err = new Error("There is no such topic")
				err.status = 400
				next(err)
			} else res.status(200).json(articles);
		}).catch(next);
};


const addNewArticle = (req, res, next) => {
	const { belongs_to, title, body, created_by } = req.body;

	//checks the number of the properties for an article
	if (!belongs_to || !title || !body || !created_by) {
		const err = new Error("New article should include the required properties 'belongs_to', 'title', 'body', 'created_by'")
		err.status = 400
		next(err)
	}

	//checks if the selected topic is in the database
	const checkTopic = (topicName) => {
		return Topics.findOne({ slug: topicName })
			.then(topic => {
				console.log(topic)
				return topic ? true : false
			})
	};
	checkTopic(belongs_to).then(exists => {
		if (!exists) {
			const err = new Error("'belongs_to' should have enitity of a valid topic")
			err.status = 400
			next(err)
		} else {
			const article = new Articles({
				belongs_to,
				title,
				body,
				created_by
			});
			article.save()
				.then(article => res.status(201).json(article))
				.catch(next);
		}
	})
};



module.exports = { getAllTopics, getArticlesByTopic, addNewArticle };