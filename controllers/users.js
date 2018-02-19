const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Users } = require('../models/models');

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
				const err = new Error(`User ${username} doesn't exist`);
				err.status = 400;
				next(err);
			} else {
				res.status(200).json(user)
					.catch(next);
			}
		});
};


module.exports = { getAllUsers, getUserByUsername };