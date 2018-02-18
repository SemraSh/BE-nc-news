const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Topics, Articles, Users } = require('../models/models.js');

const getAllTopics = (req, res, next) => {
	Topics.find()
		.then(topics => res.status(200).json(topics))
		.catch(next);
};

const getArticlesByTopic = (req, res, next) => {
	Articles.find({ belongs_to: req.params.topic })
		.then(articles => {
			if (!articles.length) {
				const err = new Error('There is no such topic');
				err.status = 400;
				next(err);
			} else res.status(200).json(articles);
		}).catch(next);
};


const addNewArticle = (req, res, next) => {
	const { belongs_to, title, body, created_by } = req.body;

	//checks if the required fields are included in the post
	if (!belongs_to || !title || !body || !created_by) {
		const err = new Error('New article should include the required properties \'belongs_to\', \'title\', \'body\', \'created_by\'');
		err.status = 400;
		next(err);
	}

	//checks if the selected topic and user are in the database
	const checkTopic = (topicName) => {
		return Topics.findOne({ slug: topicName })
			.then(topic => {
				return topic ? true : false;
			});
	};
	const checkUser = (userName) => {
		return Users.findOne({ username: userName })
			.then(user => {
				return user ? true : false;
			});
	};

	Promise.all([checkTopic(belongs_to), checkUser(created_by)])
		.then(validation => {
			[topicIsValid, userIsValid] = validation;

			if (!topicIsValid) {
				const err = new Error('\'belongs_to\' should be a valid topic');
				err.status = 400;
				next(err);
			}

			else if (!userIsValid) {
				const err = new Error('\'created_by\' should be a valid user');
				err.status = 400;
				next(err);
			}
			else {
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
		});
};


module.exports = { getAllTopics, getArticlesByTopic, addNewArticle };