const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Comments } = require('../models/models');
const { ObjectId } = require('mongoose').Types;

const getAllComments = (req, res) => {
	Comments.find()
		.then(comments => res.status(200).json(comments))
		.catch(next);
};

const getCommentById = (req, res, next) => {
	const { comment_id } = req.params
	if (!ObjectId.isValid(comment_id)) {
		const err = new Error(`Comment id is not valid!`);
		err.status = 400;
		next(err);
	} else {
		Comments.findById(comment_id)
			.then(comment => res.status(200).json(comment))
			.catch(next);
	}
}

const getCommentsByArticle = (req, res) => {

	Comments.find({ belongs_to: req.params.article_id })
		.then(comments => {
			if (!comments) {
					const err = new Error("Article doesn't exist");
					err.status = 400;
					next(err);
				} else {
					res.status(200).json(comments)
						.catch(next);
				}
		})
};


const addNewComment = (req, res) => {
	const { belongs_to, body } = req.body;
	const comment = new Comments({
		body,
		belongs_to: req.params.article_id
	});
	comment.save()
		.then(comment => res.status(201).json(comment))
		.catch(next);
};

const voteComment = (req, res) => {
	let vote = 0;
	if (req.query.vote === 'up') vote++;
	else if (req.query.vote === 'down') vote--;
	Comments.findByIdAndUpdate(req.params.comment_id, { $inc: { votes: vote } }).lean()
		.then(comment => {
			comment.votes += vote;
			res.json(comment);
		}).catch(next);
};


const deleteComment = (req, res) => {
	const { comment_id } = req.params;
	Comments.findByIdAndRemove(comment_id)
		.then(message => res.json({ message: `comment ${comment_id} deleted` }))
		.catch(next);
};


module.exports = { getAllComments, getCommentsByArticle, getCommentById, addNewComment, voteComment, deleteComment };