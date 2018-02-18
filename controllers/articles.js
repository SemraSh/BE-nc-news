const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Articles } = require('../models/models');
const { ObjectId } = require('mongoose').Types

const getAllArticles = (req, res, next) => {
	if (!req.query.page || typeof +req.query.page !== 'number') {
		const err = new Error('Please provide a query in the format page=1');
		err.statusCode = 400;
		next(err);
	}
	const page = +req.query.page || 1
	Articles.paginate({}, { page, limit: 10 })
		.then(articles => {
			if (articles.pages < page) {
				const err = new Error('Not Found!');
				err.status = 404; 
				next(err);
			} else {
				res.status(200).json(articles);
			}
		}).catch(next);
};

const getArticleById = (req, res, next) => {
	if (!ObjectId.isValid(req.params.article_id)) {
		const err = new Error(`Article id: ${req.params.article_id} is not valid!`)
		err.status = 400
		next(err)
	} else {
		Articles.findById(req.params.article_id)
			.then(article => {
				res.status(200).json(article);
			}).catch(next);
	}
};


const addNewArticle = (req, res, next) => {
	const { belongs_to, title, body, created_by } = req.body;
	const article = new Articles({
		belongs_to,
		title,
		body,
		created_by
	});
	article.save()
		.then(article => res.status(201).json(article))
		.catch(next);
};

const updateVotes = (req, res, next) => {
	//console.log(req)
	if (!req.query.vote || req.query !== 'up' || req.query !== 'down') {
		const err = new Error('Please provide a query in the format vote=up or vote=down');
		err.statusCode = 400;
		next(err);
	}
	let vote = 0;

	if (req.query.vote === 'up') vote++;
	else if (req.query.vote === 'down') vote--;

	Articles.findByIdAndUpdate({ _id: req.params.article_id }, { $inc: { votes: vote } }).lean()
		.then(article => {
			article.votes += vote;
			res.json(article);
		}).catch(next)
};


module.exports = { getAllArticles, getArticleById, addNewArticle, updateVotes };