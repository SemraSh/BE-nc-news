const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Comments } = require('../models/models');
const { ObjectId } = require('mongoose').Types;

const getAllComments = (req, res, next) => {
	Comments.find()
		.then(comments => res.status(200).json(comments))
		.catch(next);
};

const getCommentById = (req, res, next) => {
	const { comment_id } = req.params;
	if (!ObjectId.isValid(comment_id)) {
		const err = new Error('Comment id is not valid!');
		err.status = 400;
		next(err);
	} else {
		Comments.findById(comment_id)
			.then(comment => res.status(200).json(comment))
			.catch(next);
	}
};

const getCommentsByArticle = (req, res, next) => {
	Comments.find({ belongs_to: req.params.article_id })
		.then(comments => {
			if (!comments) {
				const err = new Error('Article doesn\'t exist');
				err.status = 400;
				next(err);
			} else res.status(200).json(comments);
		}).catch(next);
};

const voteComment = (req, res, next) => {
	const { vote } = req.query;
	if (vote === 'up' || vote === 'down') {
		let addVote = 0;
		if (vote === 'up') addVote++;
		else if (vote === 'down') addVote--;
		Comments.findByIdAndUpdate(req.params.comment_id, { $inc: { votes: addVote } }).lean()
			.then(comment => {
				comment.votes += addVote;
				res.json(comment);
			}).catch(next);
	}
	else {
		const err = new Error('Please provide a query in the format vote=up or vote=down');
		err.status = 400;
		next(err);
	}
};

const deleteComment = (req, res, next) => {
	const { comment_id } = req.params;
	if (!ObjectId.isValid(comment_id)) {
		const err = new Error('Comment id is not valid!');
		err.status = 400;
		next(err);
	} else {
		Comments.findByIdAndRemove(comment_id)
			.then(() => res.json({ message: `comment ${comment_id} deleted` }))
			.catch(next);
	}
};


module.exports = { getAllComments, getCommentsByArticle, getCommentById, voteComment, deleteComment };