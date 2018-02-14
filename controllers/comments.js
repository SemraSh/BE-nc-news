const mongoose = require('mongoose');
const { Comments } = require('../models/models');
mongoose.Promise = Promise;

const getAllComments = (req, res) => {
	Comments.find()
		.then(comments => res.status(200).json(comments))
		.catch(console.error);
};

const getCommentById = (req, res, next) => {
	Comments.findById(req.params.comment_id)
		.then(comment => res.status(200).json(comment))
		.catch((err) => next(err));
};

const getCommentsByArticle = (req, res) => {
	Comments.find({ belongs_to: req.params.article_id })
		.then(comments => {
			res.status(200).json(comments);
		}).catch(console.error);
};

const addNewComment = (req, res) => {
	const { belongs_to, body } = req.body;
	const comment = new Comments({
		body,
		belongs_to: req.params.article_id
	});
	comment.save()
		.then(comment => res.status(201).json(comment))
		.catch(console.error);
};

const voteComment = (req, res) => {
	let vote = 0;
	if (req.query.vote === 'up') vote++;
	else if (req.query.vote === 'down') vote--;
	Comments.findByIdAndUpdate(req.params.comment_id, { $inc: { votes: vote } }).lean()
		.then(comment => {
			comment.votes += vote;
			res.json(comment);
		}).catch(console.error);
};


const deleteComment = (req, res) => {
	const {comment_id} = req.params;
	Comments.findByIdAndRemove(comment_id)
		.then(message => res.json({message: `comment ${comment_id} deleted`}))
		.catch(console.error);
};


module.exports = {getAllComments, getCommentsByArticle, getCommentById, addNewComment, voteComment, deleteComment};