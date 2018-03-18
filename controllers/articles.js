const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Articles, Comments } = require('../models/models');
const { ObjectId } = require('mongoose').Types;

const getAllArticles = (req, res, next) => {
	if (!req.query.page || typeof +req.query.page !== 'number') {
		const err = new Error('Please provide a query in the format \'page=1\'');
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

// gets an article by id
const getArticleById = (req, res, next) => {
	const { article_id } = req.params;
	if (!ObjectId.isValid(article_id)) {
		const err = new Error('Article id is not valid!');
		err.status = 400;
		next(err);
	} else {
		Articles.findById(article_id)
			.then(article => {
				res.status(200).json(article);
			}).catch(next);
	}
};

// changes the vote of the article
const updateVotes = (req, res, next) => {
	const { vote } = req.query;
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

// adds new comment for the article
const addNewComment = (req, res, next) => {
	const { article_id } = req.params;
	const { belongs_to, body } = req.body;
	let err;
	if (!ObjectId.isValid(article_id)) {
		err = new Error('article_id is not a valid id');
		err.status = 400;
		next(err);
	}
	else if (!belongs_to || !body) {
		err = new Error('New comment should include the required properties \'belongs_to\', \'body\'');
		err.status = 400;
		next(err);
	}

	else {
		const checkArticle = (articleId) => {
			return Articles.findById(articleId)
				.then(article => {
					return article ? true : false;
				});
		};
		checkArticle(article_id).then(validated => {
			if (!validated) {
				const err = new Error('Article doesn\'t exist');
				err.status = 400;
				next(err);
			} else {
				const comment = new Comments({
					body,
					belongs_to
				});
				if (comment.belongs_to + '' !== article_id) {
					const err = new Error('belongs_to:`article_id` did not match the article id in the url');
					err.status = 400;
					next(err);
				} else {
					comment.save()
						.then(comment => res.status(201).json(comment));
				}
			}
		}).catch(next);

	}
};

deleteArticle = (req, res, next) => {
	const { article_id } = req.params;
	if (!ObjectId.isValid(article_id)) {
		const err = new Error('Article id is not valid!');
		err.status = 400;
		next(err);
	} else {
		Articles.findByIdAndRemove(article_id)
			.then(() => res.json({ message: `article ${article_id} deleted` }))
			.catch(next);
	}
}




module.exports = { getAllArticles, getArticleById, updateVotes, addNewComment, deleteArticle };