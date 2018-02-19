const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Articles } = require('../models/models');
const { ObjectId } = require('mongoose').Types;

const getAllArticles = (req, res, next) => {
	if (!req.query.page || typeof +req.query.page !== 'number') {
		const err = new Error("Please provide a query in the format 'page=1'");
		err.status = 400;
		next(err);
	} else {
		const page = +req.query.page || 1;
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
	}
};

const getArticleById = (req, res, next) => {
	const { article_id } = req.params
	if (!ObjectId.isValid(article_id)) {
		const err = new Error(`Article id is not valid!`);
		err.status = 400;
		next(err);
	} else {
		Articles.findById(article_id)
			.then(article => {
				res.status(200).json(article);
			}).catch(next);
	}
};


const updateVotes = (req, res, next) => {
	const { vote } = req.query
	if (vote === 'up' || vote === 'down') {
		let addVote = 0;
		if (vote === 'up') addVote++;
		else if (vote === 'down') addVote--;
		Articles.findByIdAndUpdate({ _id: req.params.article_id }, { $inc: { votes: addVote } }).lean()
			.then(article => {
				article.votes += addVote;
				res.json(article);
			}).catch(next);
	}
	else {
		const err = new Error('Please provide a query in the format vote=up or vote=down');
		err.status = 400;
		next(err);
	}
};


module.exports = { getAllArticles, getArticleById, updateVotes };