const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Users, Articles } = require('../models/models');

const getAllUsers = (req, res, next) => {
	Users.find()
		.then(users => res.status(200).json(users))
		.catch(next);
};

const getUserByUsername = (req, res, next) => {
	const { username } = req.params;
	Users.findOne({ username })
		.then(user => {
			if (!user) {
				const err = new Error('User doesn\'t exist');
				err.status = 400;
				next(err);
			} else res.status(200).json(user);
		}).catch(next);
};

const getArticlesByUsername = (req, res, next) => {
	const { username } = req.params;
	Articles.find({created_by: username})
		.then(articles => {
			if(!articles) {
				const err = new Error('User doesn\'t have any articles, or they don\' exist');
				err.status = 400;
				next(err);
			} else res.status(200).json(articles);
		}).catch(next)
}


module.exports = { getAllUsers, getUserByUsername, getArticlesByUsername };